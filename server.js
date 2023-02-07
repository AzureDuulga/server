const express = require("express");
const cors = require("cors");
const fs = require("fs");
const server = express();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

server.use(cors());
server.use(express.json());

server.get("/users", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("File unshihad aldaa zaalaa");
      return;
    } else {
      console.log(data);
      console.log(JSON);
      const parsedData = JSON.parse(data);
      res.status(201).json({ users: parsedData.users });
    }
  });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users[findIndex].name = name;
  parsedData.users[findIndex].email = email;
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
});

server.post("/signup", (req, res) => {
  const { name, role, email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const id = uuidv4();
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);
  const newUser = {
    id,
    name,
    role,
    password: hashedPassword,
    email,
  };
  parsedData.users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Шинэ хэрэглэгчийгн амжилттай бүртгэлээ" });
});

server.post("/signin", (req, res) => {
  const { id, email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findUser = parsedData.users.find((user) => user.id === id);
  if (!findUser) {
    res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
  }
  const isCheck = bcrypt.compareSync(password, findUser.password);
  if (isCheck) {
    es.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
  } else {
    res
      .status(401)
      .json({ message: "Имэйл эсвэл нууц үг буруу байна.", user: null });
  }
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
});

//Category starts from here ------->
server.post("/categories", (req, res) => {
  try {
    const content = fs.readFileSync("categories.json");
    const newData = { ...req.body };
    const data = JSON.parse(content);
    data.categories.push(newData);
    console.log("data", data);
    fs.writeFileSync("categories.json", JSON.stringify(data));
    res.status(201).json({ message: "амжилттай нэмлээ", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
server.get("/categories", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(categoriesData);
    res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

server.delete("/categories/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync("categories.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.categories.findIndex((el) => el.id === id);
    parsedData.categories.splice(findIndex, 1);
    fs.writeFileSync("categories.json", JSON.stringify(parsedData));
    res
      .status(201)
      .json({ message: `${id} тай category амжилттай устгагдлаа.` });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//Category ends here ------->

server.listen(8000, () => {
  console.log("server aslaa");
});
