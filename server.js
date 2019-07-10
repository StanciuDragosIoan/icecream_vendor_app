const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
// PATH for deployment
//const path = require("path");





//init app
const app = express();

//connect to DB
connectDB();

//init middleware
app.use(cors());
var bodyParser = require('body-parser');

//enables cors
// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
// }));


app.use(express.json({ extended: false }));

//define request
app.get("/", (req, res) => res.send("API for iceream-shop up and  running  (づ｡◕‿‿◕｡)づ"));



//define routes
app.use("/api/icecream", require("./routes/api/icecream"));



//paypal payments
var paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', // Sandbox or live
    client_id: 'ARdpS8YMZMc5y4G9CHtMoRkOOyn_TG0tzbhN4mM7skz1yA-EDKp7jbNE1K0cwHYB0fmxhTSHSqEwpqgG',
    client_secret: 'EG4BXKh7SVMSbMzJIP7agFn4TumkyoqBxkWmyrrvxQc4c1uktkoKm-PcX3NXKiaSOj-l2kl5WEXJqGjN'
});


//paypal route
app.post("/pay", (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Test Ice Cream Product",
                    "sku": "001",
                    "price": "5.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "5.00"
            },
            "description": "Test product payment"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            // console.log('Create payment response');
            // console.log(payment);
            // res.send('test');
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.redirect(payment.links[i].href);
                }
            }

        }
    });

});


app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };


    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));



//Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     //set static folder
//     app.use(express.static('client/build'));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }






//define port
const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log(`Server Started on Port ..${PORT}`));

