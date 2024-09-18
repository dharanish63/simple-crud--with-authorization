const Product = require("../models/product.schema");
const createError = require("http-errors");

exports.List = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    return next(createError(500, "Unable to handle request"));
  }
};

exports.Single = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return next(createError(404, "Product not found"));

    res.json(product);
  } catch (error) {
    console.log(error);
    return next(createError(500, "Unable to handle request"));
  }
};

exports.Create = async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    const product = await Product.create({
      name,
      price,
      quantity,
      createdby: req.user.id,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    return next(createError(500, "Unable to handle request"));
  }
};

exports.Update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isCheck = await Product.findById(id);
    if (req.user.id != isCheck.createdby)
      return next(createError("The content owner only edit the data"));
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return next(createError(500, "Unable to handle request"));
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isCheck = await Product.findById(id);
    if (req.user.id != isCheck.createdby)
      return next(createError("The content owner only edit the data"));
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Unable to handle request"));
  }
};
