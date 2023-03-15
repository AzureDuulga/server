const express = require("express");
const cors = require("cors");

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

const server = express();

//middlewares
server.use(cors());
server.use(express.json()); //body-Parser 4

//Routers
server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

//data MYSQL req

server.get("/", async (req, res) => {
  res.status(200).json({ message: "success" });
});

//Server listener
server.listen(8000, () => {
  console.log("server aslaa 8000");
});
