const express = require("express");
const CartManager = require("../managers/CartManager");

const router = express.Router();
const manager = new CartManager("./src/data/carts.json");

// Crear carrito
router.post("/", async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

// Obtener carrito
router.get("/:cid", async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart);
});

// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const updatedCart = await manager.addProductToCart(cid, pid);

  if (!updatedCart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(updatedCart);
});

module.exports = router;
