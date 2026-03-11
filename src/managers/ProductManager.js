const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === parseInt(id));
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      ...product,
    };

    products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();

    const filteredProducts = products.filter((p) => p.id !== parseInt(id));

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(filteredProducts, null, 2),
    );
  }
}

module.exports = ProductManager;
