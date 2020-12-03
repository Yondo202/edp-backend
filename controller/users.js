const User = require("../models/User");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const {paginate} = require("../utils/paginate");

// register
exports.register = asyncHandler(async (req, res, next) => {
  const checkUser = await req.db.user.findOne({where:{email:req.body.email}});
  if (checkUser) {
      throw new MyError("Хэрэглэгчийн имэйл давхцаж байна",400);
  }  
  const user = await req.db.user.create(req.body);

  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});

// логин хийнэ
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Оролтыгоо шалгана

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }

  // Тухайн хэрэглэгчийн хайна
  const user = await req.db.user.findOne({where:{email:email}});
  
  if (!user) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу", 401);
  }

  res.status(200).json({
    success: true,
    token: user.getJsonWebToken(),
    user: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
    const { Op } = require("sequelize");
    const query = req.body;
    const option  = {
        ...paginate(query),
    };

      const {docs,pages, total} = await req.db.user.paginate(option);
      res.status(200).json({
        success:true,
        magic:Object.keys(req.db.user.prototype),
        data:docs,
        pages,
        total,
      });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.findByPk(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй!", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  let company = await req.db.user.findByPk(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүйээээ.", 400);
  }
  company = await user.update(req.body);
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүйээээ.", 400);
  }

  await user.destroy();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new MyError("Та нууц үг сэргээх имэйл хаягаа дамжуулна уу", 400);
  }

  const user = await req.db.user.findOne({where:{email: req.body.email}});

  if (!user) {
    throw new MyError(req.body.email + " имэйлтэй хэрэглэгч олдсонгүй!", 400);
  }

  const resetToken = user.generatePasswordChangeToken();
  await user.save();


  // Имэйл илгээнэ
  const link = `http://localhost.mn/changepassword/${resetToken}`;

  const message = `Сайн байна уу<br><br>Та нууц үгээ солих хүсэлт илгээлээ.<br> Нууц үгээ доорхи линк дээр дарж солино уу:<br><br><a target="_blank" href="${link}">${link}</a><br><br>Өдрийг сайхан өнгөрүүлээрэй!`;

  const info = await sendEmail({
    email: user.email,
    subject: "Нууц үг өөрчлөх хүсэлт",
    message,
  });

  console.log("Message sent: %s", info.messageId);

  res.status(200).json({
    success: true,
    resetToken,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.resetToken || !req.body.password) {
    throw new MyError("Та токен болон нууц үгээ дамжуулна уу", 400);
  }

  const encrypted = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");
  const { Op } = require("sequelize");
  const user = await req.db.user.findOne({
    where:{
        [Op.and]:[
            {resetPasswordToken: encrypted},
            {resetPasswordExpire:  {[Op.gt]: Date.now()}}
        ]
     },
  });

  if (!user) {
    throw new MyError("Токен хүчингүй байна!", 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  console.log(user.password);
  await user.save();

  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});
