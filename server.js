const express = require("express");

//middleware
const cors = require("cors");
const server = express();

const controller = "";

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

server.use(cors());
server.use(express.json());

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

server.listen(8000, () => {
  console.log("server aslaa");
});
