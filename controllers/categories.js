const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const filePath = ".data/categories.json";

const getCategories = (req, res) => {
  try {
    const categoriesData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(categoriesData);
    res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
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

module.exports = { getCategories, deleteCategory, addCategory };
