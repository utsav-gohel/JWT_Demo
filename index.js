const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const app = express();
app.use(express.json());
app.use(bodyparser.json());
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
app.use("/user", userRouter);
app.use("/note", noteRouter);
(async () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Db connected");
      app.listen(8000, () => {
        console.log("server started");
      });
    });
  } catch (e) {
    console.log(e);
  }
})();
app.get("/hello", (req, res) => {
  res.status(200).json({
    msg: "Hello There",
  });
});

module.exports = app;
