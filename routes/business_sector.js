const express = require("express");
const {createBusiness_Sector,updateBusiness_sector,deleteBusiness_sector,getBusiness_Sectors} = require("../controller/business_sector");
const router = express.Router();
router.route("/").get(getBusiness_Sectors).post(createBusiness_Sector);

router
  .route("/:id")
  .put(updateBusiness_sector)
  .delete(deleteBusiness_sector);
module.exports = router;