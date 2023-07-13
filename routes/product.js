const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');


// !CREATE PRODUCT

router.post('/', verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body);
    try {

        const saveProduct = await newProduct.save();

        res.status(201).json(saveProduct);

    } catch (error) {
        res.status(500).json(error);
    }
})


// !UPDATE PRODUCT

router.put('/:id', async (req, res) => {
    console.log("Product")

    const id = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
});

// !DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findByIdAndDelete(id);
        res.status(201).json("Product deleted")
    } catch (error) {
        res.status(500).json(error);
    }
});
// !GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error);
    }
})



// !GET ALL PRODUCTS
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {

        let products;
        if (qNew) {
            products = await Product.find().sort({ CreatedAt: -1 }).limit(1);
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await Product.find();
        }
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router 