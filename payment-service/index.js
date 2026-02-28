const express = require("express");
const app = express();
app.use(express.json());

const payments = [];
let nextId = 1;

app.get("/payments", (req, res) => {
  res.json(payments);
});

app.get("/payments/:id", (req, res) => {
  const payment = payments.find((p) => p.id === parseInt(req.params.id));
  if (!payment) return res.status(404).json({ error: "Payment not found" });
  res.json(payment);
});

app.post("/payments/process", (req, res) => {
  const { orderId, amount, method } = req.body;
  if (!orderId || !amount || !method) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newPayment = {
    id: nextId++,
    orderId,
    amount,
    method,
    status: "SUCCESS",
  };
  payments.push(newPayment);
  res.status(201).json(newPayment);
});

const PORT = 8083;
app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));
