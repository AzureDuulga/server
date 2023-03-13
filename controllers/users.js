const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const filePath = "./data/users.json";

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM user`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Success", data: result });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: result[0] });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const parsedData = keys.map((key) => `${key}='${req.body[key]}'`).join();
  const query = `UPDATE user SET ? WHERE id= ?`;
  connection.query(query, [parsedData, id], (err, res) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesful", data: res });
  });
};

const createUser = (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);
  const query =
    "INSERT INTO user (id, name,email,password, phone_number, profile_Img) VALUES(null, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, hashedPassword, phoneNumber, "url"],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ message: "Шинэ хэрэглэгч амжилттай бүртгэгдлээ." });
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesful", data: result });
  });
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser, createUser };
