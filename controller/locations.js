const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const { paginate } = require("../utils/paginate");

exports.createLocation = asyncHandler(async (req, res, next) => {
  if (req.body instanceof Array) {
    throw new MyError(`Бүтэц буруу`, 400);
  }
  if (Object.keys(req.body).length == 0 && req.body.constructor === Object) {
    throw new MyError(`Талбаруудыг дамжуулаагүй байна`, 400);
  }
  const location = await req.db.location.create(req.body);
  res.status(200).json({
    success: true,
    data: location,
  });
});
exports.updateLocation = asyncHandler(async (req, res, next) => {
  let location = await req.db.location.findByPk(req.params.id);

  if (!location) {
    throw new MyError(`${req.params.id} id тэй албан тушаал олдсонгүй.`, 400);
  }

  location = await location.update(req.body);

  res.status(200).json({
    success: true,
    data: location,
  });
});

exports.deleteLocation = asyncHandler(async (req, res, next) => {
  let location = await req.db.location.findByPk(req.params.id);

  if (!location) {
    throw new MyError(`${req.params.id} id тэй албан тушаал олдсонгүй.`, 400);
  }

  await location.destroy();

  res.status(200).json({
    success: true,
    data: location,
  });
});

exports.getLocations = asyncHandler(async (req, res, next) => {
  const { Op } = require("sequelize");
  const query = req.query;

  const option = {
    ...paginate(query),
  };
  console.log(option);
  const { docs, pages, total } = await req.db.location.paginate(option);
  res.status(200).json({
    success: true,
    data: docs,
    pages,
    total,
  });
});
