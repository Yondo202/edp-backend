const express = require("express");
const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controller/questions");
const router = express.Router();
router.route("/").get(getQuestions).post(createQuestion);

router.route("/:id").put(updateQuestion).delete(deleteQuestion);
module.exports = router;
