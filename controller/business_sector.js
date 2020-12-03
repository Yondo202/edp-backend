const asyncHandler = require('express-async-handler');
const MyError = require("../utils/myError");
const {paginate} = require("../utils/paginate");

exports.createBusiness_Sector = asyncHandler(async (req,res,next)=>{
    
    if (req.body instanceof Array) {
      throw new MyError(`Бүтэц буруу`,400);
    }
    if (Object.keys(req.body).length ==0 && req.body.constructor === Object) {
      throw new MyError(`Талбаруудыг дамжуулаагүй байна`,400);
    }
    const business_sector = await req.db.business_sector.create(req.body);
    res.status(200).json({
      success:true,
      data:business_sector,
    });
  });

  exports.updateBusiness_sector = asyncHandler(async (req, res, next) => {
    let business_sector = await req.db.business_sector.findByPk(req.params.id);
  
    if (!business_sector) {
      throw new MyError(`${req.params.id} id тэй бизнис сектор олдсонгүй.`, 400);
    }
  
    business_sector = await business_sector.update(req.body);
  
    res.status(200).json({
      success: true,
      data: business_sector,
    });
  });

  exports.deleteBusiness_sector = asyncHandler(async (req, res, next) => {
    let business_sector = await req.db.business_sector.findByPk(req.params.id);
  
    if (!business_sector) {
      throw new MyError(`${req.params.id} id тэй бизнис ангилал олдсонгүй.`, 400);
    }
  
    await business_sector.destroy();
  
    res.status(200).json({
      success: true,
      data: business_sector,
    });
  });
  
  exports.getBusiness_Sectors = asyncHandler(async (req,res,next)=>{
    const query = req.body;
    const { Op } = require("sequelize");
    const option  = {
      ...paginate(query)
    };
      const {docs,pages, total} = await req.db.business_sector.paginate(option);
      res.status(200).json({
        success:true,
        data:docs,
        pages,
        total,
      });
    });
    