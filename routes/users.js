const { Router } = require("express");

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/users");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/", createUser);

/*router.get("/", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("File unshihad aldaa zaalaa");
      return;
    } else {
      const parsedData = JSON.parse(data);
      res.status(201).json({ users: parsedData.users });
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
});

router.put("/:id", (req, res) => {
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

router.post("/signup", (req, res) => {
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

router.post("/signin", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
});*/

module.exports = router;
