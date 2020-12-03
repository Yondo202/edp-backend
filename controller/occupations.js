const asyncHandler = require('express-async-handler');
const MyError = require("../utils/myError");
const {paginate} = require("../utils/paginate");

exports.createOccupation = asyncHandler(async (req,res,next)=>{
    if (req.body instanceof Array) {
      throw new MyError(`Бүтэц буруу`,400);
    }
    if (Object.keys(req.body).length ==0 && req.body.constructor === Object) {
      throw new MyError(`Талбаруудыг дамжуулаагүй байна`,400);
    }
    const occupation = await req.db.occupation.create(req.body);
    res.status(200).json({
      success:true,
      data:occupation,
    });
  });
  exports.updateOccupation = asyncHandler(async (req, res, next) => {
    let occupation = await req.db.occupation.findByPk(req.params.id);
  
    if (!occupation) {
      throw new MyError(`${req.params.id} id тэй албан тушаал олдсонгүй.`, 400);
    }
  
    occupation = await occupation.update(req.body);
  
    res.status(200).json({
      success: true,
      data: occupation,
    });
  });
  
  exports.deleteOccupation = asyncHandler(async (req, res, next) => {
    let product = await req.db.occupation.findByPk(req.params.id);
  
    if (!occupation) {
      throw new MyError(`${req.params.id} id тэй албан тушаал олдсонгүй.`, 400);
    }
  
    await occupation.destroy();
  
    res.status(200).json({
      success: true,
      data: occupation,
    });
  });

exports.getOccupations = asyncHandler(async(req,res,next)=>{
    const { Op } = require("sequelize");
    const query = req.query;
    
    const option  = {
        ...paginate(query)
    };
    console.log(option);
      const {docs,pages, total} = await req.db.occupation.paginate(option);
      res.status(200).json({
        success:true,
        data:docs,
        pages,
        total,
      });
});