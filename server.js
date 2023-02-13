const express = require("express");
const cors = require("cors");
const server = express();

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

server.use(cors());
server.use(express.json());

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

server.listen(8000, () => {
  console.log("server aslaa");
});
