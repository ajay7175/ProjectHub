const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const userRouter = require("./routers/user");
const projRouter = require("./routers/project");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: ["https://source-404.github.io", "http://localhost:3000"],
  })
);
app.use(userRouter);
app.use(projRouter);

app.get("", (req, res) => {
  res.send("Welcome to ProjectHut");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
