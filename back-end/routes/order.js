const express = require("express");
const router = express.Router();
const { Order, validateOrder } = require("../models/order");

router.get("/", async (req, res) => {
  const result = await Order.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    products: [{ name, price, quantity }],
    customerId,
  } = req.body;
  const createDate = new Date.now();
  const isFulfilled = false;
  const order = new Order({
    products: [{ name, price, quantity }],
    customerId,
    createDate,
    isFulfilled,
  });
  try {
    const result = await order.save();
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
