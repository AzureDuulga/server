const body = {ner:"Duulga", age : 25}

const keys = Object.keys(body);
const values = Object.values(body);
const ob = Object.entries(body)

console.log(keys);
console.log(values);
console.log(body);

// server.get("/: ", async (req, res) => {
//   const { id } = req.params;
//   connection.query(`SELECT * FROM user WHERE id=${id}`, (err, result) => {
//     if (err) {
//       res.status(400).json({ message: err.message });

//       return;
//     }
//     res.status(200).json({ message: "success", data: result });
//   });
// });

// server.post("/", async (req, res) => {
//   const { id } = req.params;
//   connection.query(
//     `INSERT INTO user(aid, name ,owog) VALUE("${id}","${req.body.name}","${req.body.owog}")`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });

//         return;
//       }
//       res.status(200).json({ message: "success", data: result });
//     }
//   );
// });

// server.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const body = req.body;

//   const keys = Object.keys(body);

//   const map = keys.map((key) => `${key}="${body[key]}"`);
//   const join = map.join();

//   connection.query(
//     // `UPDATE  user SET name="${req.body.name}", owog="${req.body.owog}" WHERE aid=${id}`,
//     `UPDATE  user SET ${join} " WHERE id=${id}`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });

//         return;
//       }
//       res.status(200).json({ message: "success", data: result });
//     }
//   );
// });

// server.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   connection.query(`DELETE FROM user WHERE id=${id}`, (err, result) => {
//     if (err) {
//       res.status(400).json({ message: err.message });

//       return;
//     }
//     res.status(200).json({ message: "success", data: result });
//   });
// });