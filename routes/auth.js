
const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

// !REGISTER

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.Secret);

    const newUser = new User(
        {
            username,
            email,
            password: hashedPassword.toString()
        })

    try {
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json(error);
        console.log(error);
    }
});

// !LOGIN
router.post('/login', async (req, res) => {

    const { username, password } = req.body;
    let user;
    try {
        user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "Wrong username" })
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.Secret);

        const OrginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (password !== OrginalPassword) {
            return res.status(500).json({ message: "Wrong password" })
        }
        const accessToken = JWT.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "3d" }
        );
        return res.status(200).json({ user, accessToken });

    } catch (error) {
        return res.status(500).json(error.message);
    }

})
module.exports = router;