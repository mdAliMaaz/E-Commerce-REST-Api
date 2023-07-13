const router = require('express').Router();
const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')




router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {

        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.Secret).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        return res.status(200).json(updatedUser);
    }
    catch (error) {

        return res.status(500).json(error);
    }
})



// !DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json("User deleted")
    } catch (error) {
        return res.status(500).json(error)
    }
})


// !GET USERS
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {

        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json(user);

    } catch (error) {

        return res.status(500).json(error)
    }
})


// !GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {

        const users = await User.find();
        return res.status(200).json(users);

    } catch (error) {

        return res.status(500).json(error)
    }
})

// !GET USER STSTS
// TODO



module.exports = router;