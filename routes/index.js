const Router = require("express").Router();
const products = require("./product.route");
const users = require('./user.route')
Router.use("/products", products);
Router.use("/user",users)

module.exports = Router;
