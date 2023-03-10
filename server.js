const express = require("express");
const mysql = require("mysql2");
//middleware
const cors = require("cors");
const server = express();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "azure_db",
});

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

server.use(cors());
server.use(express.json());

//data MYSQL req

server.get("/", async (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM user WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });

      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
});

server.post("/", async (req, res) => {
  const { id } = req.params;
  connection.query(
    `INSERT INTO user(aid, name ,owog) VALUE("${id}","${req.body.name}","${req.body.owog}")`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
});

server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const keys = Object.keys(body);

  const map = keys.map((key) => `${key}="${body[key]}"`);
  const join = map.join();

  connection.query(
    // `UPDATE  user SET name="${req.body.name}", owog="${req.body.owog}" WHERE aid=${id}`,
    `UPDATE  user SET ${join} " WHERE id=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
});

server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM user WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });

      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
});

//Routers
server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

//Server listener
server.listen(8000, () => {
  console.log("server aslaa");
});
