const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
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

const addCategory = (req, res) => {
  try {
    const content = fs.readFileSync(filePath);
    const newData = { ...req.body };
    const data = JSON.parse(content);
    data.categories.push(newData);
    console.log("data", data);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "амжилттай нэмлээ", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const deleteCategory = (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.categories.findIndex((el) => el.id === id);
    parsedData.categories.splice(findIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res
      .status(201)
      .json({ message: `${id} тай category амжилттай устгагдлаа.` });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  addCategory,
};
