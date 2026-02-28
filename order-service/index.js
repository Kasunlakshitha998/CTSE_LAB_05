const express = require("express");
const app = express();
app.use(express.json());

const orders = [];
let nextId = 1;

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

app.post("/orders", (req, res) => {
  const { item, quantity, customerId } = req.body;
  if (!item || !quantity || !customerId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newOrder = {
    id: nextId++,
    item,
    quantity,
    customerId,
    status: "PENDING",
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

const PORT = 8082;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
