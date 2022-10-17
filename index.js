const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./api/users/users.router");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/upload", express.static("upload"));
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port:http://localhost:${process.env.PORT}`);
});
