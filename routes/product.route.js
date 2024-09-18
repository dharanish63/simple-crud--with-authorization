const express = require("express");
const router = express.Router();
const {validation} =require('../validators/product.validation')
const { verifytoken } = require("../jwttoken");
const {
  Create,
  List,
  Single,
  Delete,
  Update,
} = require("../controllers/product.controller");

router.get("/", List);
router.get("/:id", Single);

/* Protected route */
router.post("/",validation, verifytoken, Create);
router.put("/:id", verifytoken, Update);
router.delete("/:id", verifytoken, Delete);

module.exports = router;

/*
product = {
id:123
name:"iPhone 16Pro"
price: 1500
currency: USD
}
*/

/**
 * GET: baseurl/api/v1/products
 * GET: baseurl/api/v1/products/<id>
 * POST: baseurl/api/v1/products
 * PUT: baseurl/api/v1/products/<id>  {price:1600, name:"iPhone 17Pro"}
 * DELETE: baseurl/api/v1/products/<id>
 */
