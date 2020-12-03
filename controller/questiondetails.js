const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const { paginate } = require("../utils/paginate");

exports.createQuestionDetail = asyncHandler(async (req, res, next) => {
  if (req.body instanceof Array) {
    throw new MyError(`Бүтэц буруу`, 400);
  }
  if (Object.keys(req.body).length == 0 && req.body.constructor === Object) {
    throw new MyError(`Талбаруудыг дамжуулаагүй байна`, 400);
  }
  const questionDetail = await req.db.questiondetails.create(req.body);
  res.status(200).json({
    success: true,
    data: questionDetail,
  });
});
exports.updateQuestionDetail = asyncHandler(async (req, res, next) => {
  let questionDetail = await req.db.questiondetails.findByPk(req.params.id);

  if (!questionDetail) {
    throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
  }

  questionDetail = await questionDetail.update(req.body);

  res.status(200).json({
    success: true,
    data: questionDetail,
  });
});

exports.deleteQuestionDetail = asyncHandler(async (req, res, next) => {
  let questionDetail = await req.db.questiondetails.findByPk(req.params.id);

  if (!questionDetail) {
    throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
  }

  await questionDetail.destroy();

  res.status(200).json({
    success: true,
    data: questionDetail,
  });
});
exports.getQuestionDetails = asyncHandler(async (req, res, next) => {
  const query = req.body;
  option = {
    ...paginate(query),
  };
  const questionDetails = await req.db.questiondetails.paginate(option);
  res.status(200).json({
    success: true,
    data: questionDetails,
  });
});
