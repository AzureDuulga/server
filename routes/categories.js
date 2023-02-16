const { Router } = require("express");

const {
  getCategories,
  deleteCategory,
  addCategory,
} = require("../controllers/categories");

const router = Router();

router.get("/", getCategories);
router.put("/", addCategory);
router.delete("/:id", deleteCategory);

/*router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
  try {
    const categoriesData = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(categoriesData);
    res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", (req, res) => {
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
}); */

module.exports = router;
