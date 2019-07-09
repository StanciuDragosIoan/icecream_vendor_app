const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Icecream = require("../../models/Icecream");

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));



// // allow * for CORS (for paypal)
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





//paypal payments
var paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', // Sandbox or live
    client_id: 'ARdpS8YMZMc5y4G9CHtMoRkOOyn_TG0tzbhN4mM7skz1yA-EDKp7jbNE1K0cwHYB0fmxhTSHSqEwpqgG',
    client_secret: 'EG4BXKh7SVMSbMzJIP7agFn4TumkyoqBxkWmyrrvxQc4c1uktkoKm-PcX3NXKiaSOj-l2kl5WEXJqGjN'
});

// Build PayPal payment request
var payReq = JSON.stringify({
    intent: 'sale',
    payer: {
        payment_method: 'paypal'
    },
    redirect_urls: {
        return_url: 'http://localhost:5000/process',
        cancel_url: 'http://localhost:5000/cancel'
    },
    transactions: [{
        amount: {
            total: '10',
            currency: 'USD'
        },
        description: 'This is the payment transaction description.'
    }]
});



//@route GET api/icecream
//@desc Test Route
//@access Public
// router.get("/", (req, res) => res.send('Icecream Route for testing purposes'));
router.get("/", async (req, res) => await res.send('Icecream Route for testing purposes'));

//@route GET api/icecream/all
//@desc Get all icecream items
//@access Public
router.route('/get/all').get(async (req, res) => {
    await Icecream.find()
        .then(icecreams => res.json(icecreams))
        .catch(err => res.status(400).json('Error: ' + err));
});


//@route get only 1 icecream item api/icecream/get/:id
//@desc Delete one icecream item
//@access Public
router.route('/get/:id').get(async (req, res) => {
    await Icecream.findById(req.params.id)
        .then(icecream => res.json(icecream))
        .catch(err => res.status(400).json('Error: ' + err));
});


//@route POST api/icecream/add
//@desc Register icecream item
//@access Public
router.post("/add", [
    check("flavour", "Please provide a flavour for the new icecream.")
        .not()
        .isEmpty(),
    check("price", "Please name a price for the new icecream.")
        .not()
        .isEmpty(),
    check(
        "description",
        "Please enter a description of more than 15 letters for your icecream so people will buy it."
    )
        .not()
        .isEmpty()
        .isLength({ min: 15 }),
    check("quantity", "Please enter a quantity (at least one number).")
        .not()
        .isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //destructure request body
        const { flavour, price, description, quantity } = req.body;

        try {
            //see if icecream item exists
            let icecream = await Icecream.findOne({ flavour });
            if (icecream) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Icecream item already exists.." }] });
            }

            icecream = new Icecream({
                flavour,
                price,
                description,
                quantity
            });


            //save icecream to db
            await icecream.save();

            res.send('Icecream item added to the database');
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Icecream server error");
        }
        //console.log(req.body);

    });





//@route delete api/icecream/delete/:id
//@desc Delete one icecream item
//@access Public
// router.get("/delete/item-id", (req, res) => res.send("Delete a single icecream item"));
router.route('/delete/:id').delete(async (req, res) => {
    await Icecream.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});



//@route update api/icecream/delete/:id
//@desc update one icecream item
//@access Public
router.route('/update-icecream/:id').put(async (req, res) => {
    await app.post("/pay", (req, res) => {
        // const create_payment_json = {
        //     "intent": "sale",
        //     "payer": {
        //         "payment_method": "paypal"
        //     },
        //     "redirect_urls": {
        //         "return_url": "http://localhost:5000/success",
        //         "cancel_url": "http://localhost:5000/cancel"
        //     },
        //     "transactions": [{
        //         "item_list": {
        //             "items": [{
        //                 "name": "Test Icecream Product",
        //                 "sku": "001",
        //                 "price": "25.00",
        //                 "currency": "USD",
        //                 "quantity": 1
        //             }]
        //         },
        //         "amount": {
        //             "currency": "USD",
        //             "total": "25.00"
        //         },
        //         "description": "Test product payment"
        //     }]
        // };


        // paypal.payment.create(create_payment_json, function (error, payment) {
        //     if (error) {
        //         throw error;
        //     } else {
        //         console.log('Create payment response');
        //         console.log(payment);
        //         // for (let i = 0; i < payment.links.length; i++) {
        //         //     if (payment.links[i].rel === "approval_url") {
        //         //         res.redirect(payment.links[i].href);
        //         //     }
        //         // }

        //     }
        // });
    });





    await Icecream.findById(req.params.id)
        .then(icecream => {
            icecream.flavour = req.body.flavour;
            icecream.price = req.body.price;
            icecream.description = req.body.description;
            icecream.quantity = req.body.quantity;

            icecream.save()
                .then(() => {
                    // const create_payment_json = {
                    //     "intent": "sale",
                    //     "payer": {
                    //         "payment_method": "paypal"
                    //     },
                    //     "redirect_urls": {
                    //         "return_url": "http://localhost:5000/success",
                    //         "cancel_url": "http://localhost:5000/cancel"
                    //     },
                    //     "transactions": [{
                    //         "item_list": {
                    //             "items": [{
                    //                 "name": "Test Icecream Product",
                    //                 "sku": "001",
                    //                 "price": "25.00",
                    //                 "currency": "USD",
                    //                 "quantity": 1
                    //             }]
                    //         },
                    //         "amount": {
                    //             "currency": "USD",
                    //             "total": "25.00"
                    //         },
                    //         "description": "Test product payment"
                    //     }]
                    // };


                    // paypal.payment.create(create_payment_json, function (error, payment) {
                    //     if (error) {
                    //         throw error;
                    //     } else {
                    //         // console.log('Create payment response');
                    //         console.log(payment);

                    //         // for (let i = 0; i < payment.links.length; i++) {
                    //         //     if (payment.links[i].rel === "approval_url") {
                    //         //         // res.redirect(payment.links[i].href);
                    //         //         //res.redirect("http://localhost:5000");
                    //         //         //window.open(payment.links[i].href, '_blank');
                    //         //     }
                    //         // }

                    //     }
                    // });

                    res.json('Icecream updated put!');

                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});







module.exports = router;