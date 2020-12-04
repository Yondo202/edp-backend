const express = require("express");
const { checkquestion } = require("../controller/questionresults");
const router = express.Router();
router.route("/").post(checkquestion);

module.exports = router;
