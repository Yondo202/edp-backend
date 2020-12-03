const express = require("express");
const {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocations,
} = require("../controller/locations");
const router = express.Router();

router.route("/").get(getLocations).post(createLocation);
router.route("/:id").put(updateLocation).delete(deleteLocation);
module.exports = router;
