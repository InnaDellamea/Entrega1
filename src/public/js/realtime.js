const socket = io();

const productList = document.getElementById("productList");
const form = document.getElementById("productForm");

socket.on("products", (products) => {
  productList.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${p.thumbnail || "https://via.placeholder.com/200"}">

      <h3>${p.title}</h3>

      <p class="description">
        ${p.description || "Producto gamer de alta calidad"}
      </p>

      <p class="price">$${p.price}</p>

      <button class="delete-btn" onclick="deleteProduct(${p.id})">
        Eliminar
      </button>
    `;

    productList.appendChild(card);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: form.title.value,
    price: form.price.value,
    thumbnail: form.thumbnail.value,
  };

  socket.emit("addProduct", data);

  form.reset();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
