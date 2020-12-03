const express = require("express");
const {createUser,getUsers,updateUser,deleteUser,register,login,forgotPassword,resetPassword} = require("../controller/users");

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/").get(getUsers).post(createUser);

router
  .route("/:id")
  .put(updateUser)
  .delete(deleteUser);
module.exports = router;