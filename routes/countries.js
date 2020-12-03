const express = require("express");
const { getCountries,createCountry,updateCountry,deleteCountry } = require("../controller/countries");

const router = express.Router();

router.route("/").get(getCountries).post(createCountry);
router.route("/:id").put(updateCountry).delete(deleteCountry);

module.exports = router;