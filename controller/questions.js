const asyncHandler = require("express-async-handler");

const MyError = require("../utils/myError");
const { paginate } = require("../utils/paginate");

exports.createQuestion = asyncHandler(async (req, res, next) => {
  if (req.body instanceof Array) {
    throw new MyError(`Бүтэц буруу`, 400);
  }
  if (Object.keys(req.body).length == 0 && req.body.constructor === Object) {
    throw new MyError(`Талбаруудыг дамжуулаагүй байна`, 400);
  }

  const question = await req.db.questions.create(req.body);
  const details = req.body.questiondetails;

  if (details && details instanceof Array) {
    const resDetails = [];
    for (detail of details) {
      detail.questionid = question.id;
      const reDetail = await req.db.questiondetails.create(detail);
      resDetails.push(reDetail);
    }
    res.status(200).json({
      success: true,
      data: question,
    });
  } else
    res.status(200).json({
      success: true,
      data: question,
    });
});
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  let question = await req.db.questions.findByPk(req.params.id);

  if (!question) {
    throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
  }

  question = await question.update(req.body);

  res.status(200).json({
    success: true,
    data: question,
  });
});

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  let question = await req.db.questions.findByPk(req.params.id);

  if (!question) {
    throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
  }

  await question.destroy();

  res.status(200).json({
    success: true,
    data: question,
  });
});
exports.getQuestions = asyncHandler(async (req, res, next) => {
  const query = req.query;
  option = {
    ...paginate(query),
    include: [{ model: req.db.questiondetails }],
  };
  const questions = await req.db.questions.paginate(option);
  res.status(200).json({
    success: true,
    data: questions,
  });
});
