const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/user.js");
const taskRoute = require("./routes/task.js");
const projectRoute = require("./routes/project.js");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
