const Order = require('../models/Order');

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

// !CREATE ORDER
router.post('/', async (req, res) => {

    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



// !UPDATE ORDER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const id = req.params.id;

    try {
        const updateOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateOrder)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error)
    }
})

// !DELETE FROM ORDER

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const id = req.params.id;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json("item deleted successfully")
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message)
    }
})
// !GET USER ORER
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userID: req.params.userId })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message)
    }
})





// !GET ALL CART ITEMS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message)
    }
})


module.exports = router