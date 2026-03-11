const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  res.render("home", {
    products,
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = router;
