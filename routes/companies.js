const express = require("express");
const {protect } = require("../middleware/protect");
const {createCompany,getCompanies,updateCompany,deleteCompany} = require("../controller/companies");
const router = express.Router();
router.route("/").get(protect,getCompanies).post(createCompany);

router
  .route("/:id")
  .put(updateCompany)
  .delete(deleteCompany);
module.exports = router;