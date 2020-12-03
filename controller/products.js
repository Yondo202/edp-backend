
const asyncHandler = require('express-async-handler');
const MyError = require("../utils/myError");
const {paginate} = require("../utils/paginate");


exports.createProduct = asyncHandler(async (req,res,next)=>{
  if (req.body instanceof Array) {
    throw new MyError(`Бүтэц буруу`,400);
  }
  if (Object.keys(req.body).length ==0 && req.body.constructor === Object) {
    throw new MyError(`Талбаруудыг дамжуулаагүй байна`,400);
  }
  const product = await req.db.products.create(req.body);
  res.status(200).json({
    success:true,
    data:product,
  });
});
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await req.db.products.findByPk(req.params.id);

  if (!product) {
    throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
  }

  product = await product.update(req.body);

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await req.db.products.findByPk(req.params.id);

  if (!product) {
    throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
  }

  await product.destroy();

  res.status(200).json({
    success: true,
    data: product,
  });
});
exports.getProducts = asyncHandler(async (req,res,next)=>{
  const query = req.body;
  option = {
    ...paginate(query)
  }
    const products = await req.db.products.paginate(option);
    res.status(200).json({
      success:true,
      data:products,
    });
  });
  