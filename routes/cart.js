const Cart = require('../models/Cart');

const { verifyTokenAndAuthorization, } = require('./verifyToken');

const router = require('express').Router();

// !ADD TO CART
router.post('/', verifyTokenAndAuthorization, async (req, res) => {

    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error)
    }
})



// !UPDATE CART
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const id = req.params.id;

    try {
        const updateCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateCart)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error)
    }
})

// !DELETE FROM CART
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const id = req.params.id;
    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json("item deleted successfully")
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message)
    }
})


// !GET USER CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userID: req.params.userID })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message)
    }
})



// !GET ALL CART ITEMS
router.get('/', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const items = await Cart.find();
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message)
    }
})

module.exports = router