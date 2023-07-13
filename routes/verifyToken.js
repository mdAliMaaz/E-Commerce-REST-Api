const JWT = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json("you are not authenticated")
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_ACCESS_TOKEN, (error, user) => {
        if (error) {
            return res.status(403).json("Token is not Valid !");
        }
        req.user = user;
        next();
    })
}


const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that!");
        }
    })
}


const verifyTokenAndAdmin = (req, res, next) => {

    verifyToken(req, res, () => {

        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not Admin");
        }
    })
}


module.exports = { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken };