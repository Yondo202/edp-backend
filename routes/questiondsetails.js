const express = require("express");
const {
  createQuestionDetail,
  getQuestionDetails,
  updateQuestionDetail,
  deleteQuestionDetail,
} = require("../controller/questiondetails");
const router = express.Router();
router.route("/").get(getQuestionDetails).post(createQuestionDetail);

router.route("/:id").put(updateQuestionDetail).delete(deleteQuestionDetail);
module.exports = router;
