import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json()); // this allows us to send any json file using client 


  const db = mysql.createConnection({
    host: "bdpmombziykmkumdr4ft-mysql.services.clever-cloud.com",
    user: "urgf2vnzubwmkryd",
    password: "HKGcvn3KegyxXCj6Ycio",
    database: "bdpmombziykmkumdr4ft",
    port: "3306"
  });


// app.get("/", (req, res) => {
//   res.json("hello");
// });

app.get("/books", (req, res) => {
  const q = "SELECT * FROM Books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO Books(`title`, `desc`, `cover`, `price`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM Books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE Books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
