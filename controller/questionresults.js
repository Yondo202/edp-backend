const asyncHandler = require("express-async-handler");
exports.checkquestion = asyncHandler(async (req, res, next) => {
  if (Object.keys(req.body).length == 0 && req.body.constructor === Object) {
    throw new MyError(`Талбаруудыг дамжуулаагүй байна`, 400);
  }

  console.log(req.body);

  const checkData = req.body;
  let approvedCompany = false;
  let approvedCluster = false;

  const a1 = await req.db.questiondetails.findByPk(checkData["1"][0]);

  let isContinue = true;
  const checkcode = a1.checkcode.trim();
  if (checkcode == "e") isContinue = false;

  if (checkcode == "a") {
    approvedCompany = true;
    approvedCluster = true;
  } else if (checkcode == "b" || checkcode == "c" || checkcode == "d") {
    approvedCompany = false;
    approvedCluster = true;
  } else if (checkcode == "e") {
    approvedCompany = false;
    approvedCluster = false;
  }

  if (isContinue) {
    const a2 = checkData["2"];
    approvedCompany = true;
    approvedCluster = true;
    for (a of a2) {
      const b = Object.values(a);
      if (b === 1) {
        isContinue = false;
        approvedCompany = false;
        approvedCluster = false;
        {
          break;
        }
      }
    }
  }
  if (isContinue) {
    const a3 = await req.db.questiondetails.findByPk(checkData["3"][0]);
    if (a3.checkcode == "Үгүй") {
      approvedCompany = false;
    }
    isContinue = true;
  }
  if (isContinue) {
    const a4 = await req.db.questiondetails.findByPk(checkData["4"][0]);
    if (a4.checkcode == "b" || a4.checkcode == "c") {
      approvedCompany = false;
    }
    isContinue = true;
  }

  if (isContinue) {
    const a5 = checkData["5"];
    for (a of a5) {
      const b = Object.values(a);
      if (b === 1) {
        approvedCompany = false;
        {
          break;
        }
      }
    }
    isContinue = true;
  }
  if (isContinue) {
    const a6 = await req.db.questiondetails.findByPk(checkData["6"][0]);
    if (a6.checkcode == "Тийм") {
      approvedCompany = false;
    }
  }

  const rr = { approvedCompany, approvedCluster };

  res.status(200).json({
    success: true,
    data: rr,
  });
});
