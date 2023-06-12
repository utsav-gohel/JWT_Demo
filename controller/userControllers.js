const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const expiresIn = process.env.JWT_EXPIRES_IN;
const getUser = async (req, res) => {
  try {
    const data = await userModel.findById(req.params.id);
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ msg: "err" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ msg: "err" });
  }
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ msg: "user already exist" });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const result = userModel.create({
      email: email,
      password: hashPwd,
      username: username,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      SECRET_KEY,
      {
        expiresIn,
      }
    );
    res.status(201).json({
      message: "SignUp Succesfully",
      user: await result,
      token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const existUser = await userModel.findOne({ email: email });
  if (!existUser) {
    return res.status(404).json({ msg: "User not exist" });
  }
  const matchPwd = await bcrypt.compare(password, existUser.password);
  if (!matchPwd) {
    return res.status(404).json({ msg: "Enter correct password" });
  }
  const token = await jwt.sign(
    { email: existUser.email, id: existUser.id },
    SECRET_KEY,
    {
      expiresIn,
    }
  );
  res.status(200).json({
    message: "SignIn Succesfully",
    user: existUser,
    token: token,
  });
};

module.exports = { signIn, signUp, getUser, getAllUser };
