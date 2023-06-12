const express = require("express");
const {
  signUp,
  signIn,
  getUser,
  getAllUser,
} = require("../controller/userControllers");
const userRouter = express.Router();

userRouter.get("/signup/:id", getUser);
userRouter.get("/getAllUser/", getAllUser);
userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);

module.exports = userRouter;
