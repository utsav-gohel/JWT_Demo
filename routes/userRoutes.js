const express = require("express");
const { signUp, signIn, getUser } = require("../controller/userControllers");
const userRouter = express.Router();

userRouter.get("/signup/:id", getUser);
userRouter.post("/signup", signUp);

userRouter.post("/signin", signIn);

module.exports = userRouter;
