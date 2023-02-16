const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const filePath = "./data/users.json";

const getAllUsers = (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("File unshihad aldaa zaalaa");
      console.log("ERR:", err);
      return;
    } else {
      const parsedData = JSON.parse(data);
      res.status(201).json({ users: parsedData.users });
    }
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
};
const putUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users[findIndex].name = name;
  parsedData.users[findIndex].email = email;
  fs.writeFileSync(filePath, JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(filePath, "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
};

module.exports = { getAllUsers, getUser, putUser, deleteUser };
