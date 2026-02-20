const express = require("express");
const ProductManager = require("../managers/ProductManager");

const router = express.Router();
const manager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  const product = await manager.getProductById(pid);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await manager.addProduct(product);
  res.status(201).json(newProduct);
});

module.exports = router;
