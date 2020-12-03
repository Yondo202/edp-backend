const asyncHandler = require('express-async-handler');
const MyError = require("../utils/myError");
const {paginate} = require("../utils/paginate");


exports.createCountry = asyncHandler(async (req,res,next)=>{
    if (req.body instanceof Array) {
      throw new MyError(`Бүтэц буруу`,400);
    }
    if (Object.keys(req.body).length ==0 && req.body.constructor === Object) {
      throw new MyError(`Талбаруудыг дамжуулаагүй байна`,400);
    }
    const country = await req.db.country.create(req.body);
    res.status(200).json({
      success:true,
      data:country,
    });
  });
  exports.updateCountry = asyncHandler(async (req, res, next) => {
    let country = await req.db.country.findByPk(req.params.id);
  
    if (!country) {
      throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
    }
  
    country = await country.update(req.body);
  
    res.status(200).json({
      success: true,
      data: country,
    });
  });
  
  exports.deleteCountry = asyncHandler(async (req, res, next) => {
    let product = await req.db.country.findByPk(req.params.id);
  
    if (!country) {
      throw new MyError(`${req.params.id} id тэй бүтээгдэхүүн олдсонгүй.`, 400);
    }
  
    await country.destroy();
  
    res.status(200).json({
      success: true,
      data: country,
    });
  });

exports.getCountries = asyncHandler(async(req,res,next)=>{
    const { Op } = require("sequelize");
    const query = req.query;
    
    const option  = {
        ...paginate(query)
    };
    console.log(option);
      const {docs,pages, total} = await req.db.country.paginate(option);
      res.status(200).json({
        success:true,
        data:docs,
        pages,
        total,
      });
});