const express = require("express");
const {createOccupation,updateOccupation,deleteOccupation,getOccupations} = require("../controller/occupations");
const router = express.Router();

router.route("/").get(getOccupations).post(createOccupation);
router.route("/:id").put(updateOccupation).delete(deleteOccupation);
module.exports = router;