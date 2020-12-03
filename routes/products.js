const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/products");
const router = express.Router();
router.route("/").get(getProducts).post(createProduct);

router.route("/:id").put(updateProduct).delete(deleteProduct);
module.exports = router;
