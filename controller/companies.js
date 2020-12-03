const asyncHandler = require('express-async-handler');
const MyError = require("../utils/myError");
const {paginate} = require("../utils/paginate");

exports.createCompany = asyncHandler(async (req,res,next)=>{
    
    if (req.body instanceof Array) {
      throw new MyError(`Бүтэц буруу`,400);
    }
    if (Object.keys(req.body).length ==0 && req.body.constructor === Object) {
      throw new MyError(`Талбаруудыг дамжуулаагүй байна`,400);
    }
    const company = await req.db.companies.create(req.body);
    res.status(200).json({
      success:true,
      data:company,
    });
  });
  exports.updateCompany = asyncHandler(async (req, res, next) => {
    let company = await req.db.companies.findByPk(req.params.id);
  
    if (!company) {
      throw new MyError(`${req.params.id} id тэй компани олдсонгүй.`, 400);
    }
  
    company = await companies.update(req.body);
  
    res.status(200).json({
      success: true,
      data: company,
    });
  });

  exports.deleteCompany = asyncHandler(async (req, res, next) => {
    let company = await req.db.companies.findByPk(req.params.id);
  
    if (!company) {
      throw new MyError(`${req.params.id} id тэй компани олдсонгүй.`, 400);
    }
  
    await company.destroy();
  
    res.status(200).json({
      success: true,
      data: company,
    });
  });
  
  exports.getCompanies = asyncHandler(async (req,res,next)=>{
    const query = req.query;
    const { Op } = require("sequelize");

    
    const option  = {
        // where:{
        //     invested_countryid:{[Op.not]: null}
        // },
        ...paginate(query),
        include:[
            {model:req.db.business_sector,},
            {model:req.db.country},
            {model:req.db.location},
            {model:req.db.occupation}
        ],
             
    };
      const {docs,pages, total} = await req.db.companies.paginate(option);
      res.status(200).json({
        success:true,
        // magic:Object.keys(req.db.companies.prototype),
        data:docs,
        pages,
        total,
        
      });
    });
    