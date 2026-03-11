const express = require("express");
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

const ProductManager = require("./managers/ProductManager");

const { engine } = require("express-handlebars");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 8080;

// servidor HTTP
const httpServer = http.createServer(app);

// socket server
const io = new Server(httpServer);

// product manager
const productManager = new ProductManager("./src/data/products.json");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// router de vistas
app.use("/", viewsRouter);

// websockets
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // enviar productos actuales
  const products = await productManager.getProducts();
  socket.emit("products", products);

  // agregar producto
  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);

    const updatedProducts = await productManager.getProducts();
    io.emit("products", updatedProducts);
  });

  // eliminar producto
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);

    const updatedProducts = await productManager.getProducts();
    io.emit("products", updatedProducts);
  });
});

// escuchar servidor
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
