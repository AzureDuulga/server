const fs = require("fs");
const filePath = "./data/categories.json";
const connection = require("../config/db");

const getCategories = (req, res) => {
  const query = `SELECT * FROM categories`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ result });
  });
};
const getCategory = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM categories WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: result[0] });
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const parsedData = keys.map((key) => `${key}='${req.body[key]}'`).join();
  const query = `UPDATE categories SET ? WHERE id= ?`;
  connection.query(query, [parsedData, id], (err, res) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesful", data: res });
  });
};

const createCategory = (req, res) => {
  const { title, images, description } = req.body;
  const query =
    "INSERT INTO categories (id, title, images, description) VALUES(null, ?, ?, ?)";
  connection.query(query, [title, images, description], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: "Шинэ категори амжилттай бүртгэгдлээ." });
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM categories WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesful", data: result });
  });
};

module.exports = {
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
};
