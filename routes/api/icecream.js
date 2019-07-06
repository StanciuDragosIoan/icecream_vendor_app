const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Icecream = require("../../models/Icecream");





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
    await Icecream.findById(req.params.id)
        .then(icecream => {
            icecream.flavour = req.body.flavour;
            icecream.price = req.body.price;
            icecream.description = req.body.description;
            icecream.quantity = req.body.quantity;

            icecream.save()
                .then(() => res.json('Icecream updated put!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});







module.exports = router;