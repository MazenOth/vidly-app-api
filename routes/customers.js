const express = require("express");
const router = express.Router();
const Joy = require("joi");
const mongoose = require("mongoose");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      match: /[0-9]/,
    },
    _id: {
      type: String,
      default: mongoose.Types.ObjectId,
    },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );

  if (!customer)
    res.status(404).send("The customer with the given ID wasn't found.");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID wasn't found.");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    res.status(404).send("The customer with the given ID wasn't found.");
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joy.object({
    name: Joy.string().min(5).max(50).required(),
    phone: Joy.string().min(5).max(50).pattern(/[0-9]/).required(),
    isGold: Joy.boolean(),
  });
  return schema.validate(customer);
}

module.exports = router;
