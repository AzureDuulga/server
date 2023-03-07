const express = require("express");
const mysql = require("mysql2")

const connection =mysql.createConnection({
  host:"localhost",
  port:3306,
  user:"root",
  password:"",
  database:"azure_db"
})


//middleware
const cors = require("cors");
const server = express();


const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

server.use(cors());
server.use(express.json());

//data MYSQL req

server.get("/", async(req,res)=>{
  connection.query("SELECT * FROM azure_user",(err,result)=>{
    if(err){
      res.status(400).json({message:err.message});
      return;
    }
    res.status(200).json({message:"success",data:result})
  })
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM azure_user WHERE aid=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });

        return;
      }
      res.status(200).json({ message: "success", data: result });
    }
  );
});

server.post("/", async (req, res) => {
  const { id } = req.params;
  connection.query(
    `INSERT INTO azure_user(aid, name ,owog) VALUE("${id}","${req.body.name}","${req.body.owog}")`,
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
  const body=req.body;

const keys=Object.keys(body)

const map=keys.map((key)=>`${key}="${body[key]}"`);
const join=map.join();

  connection.query(
    // `UPDATE  azure_user SET name="${req.body.name}", owog="${req.body.owog}" WHERE aid=${id}`,
    `UPDATE  azure_user SET ${join} " WHERE aid=${id}`,
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
  connection.query(`DELETE FROM azure_user WHERE aid=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });

      return;
    }
    res.status(200).json({ message: "success", data: result });
  });
});

server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

server.listen(8000, () => {
  console.log("server aslaa");
});
