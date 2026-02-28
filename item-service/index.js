const express = require("express");
const app = express();
app.use(express.json());

const items = [
  { id: 1, name: "Book" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Phone" },
];
let nextId = 4;

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

const PORT = 8081;
app.listen(PORT, () => console.log(`Item service running on port ${PORT}`));
