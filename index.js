const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

const Cors = require('cors');



const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connection established")).catch((error) => console.log(error))


// !MIDDLEWARES
app.use(express.json());
app.use(Cors());


// !USER REGISTER AND LOGIN
app.use("/api", auth)


//! USER
app.use("/api/user", userRouter)

// !PRODUCT
app.use('/api/products', productRouter);

//! CART
app.use("/api/carts", cartRouter)


//! ORDER
app.use("/api/orders", orderRouter)



app.listen(process.env.PORT || 5000, () => console.log('listening on port ' + process.env.PORT))