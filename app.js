const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");

connectDb();
app.use(express.json());

app.use("/posts", postsRoutes);

app.use(morgan("dev"));
// const cors

// not found middleware
app.use((req, res, next) => {
  res.status(404).json({ msg: "Path not found" });
});

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ msg: err.msg });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
