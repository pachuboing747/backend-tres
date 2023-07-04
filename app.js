const express = require("express");
const products = require("./productos.json");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const productHTML = products
      .map(
        (product) => `
      <div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Price: ${product.price}</p>
        <img src="${product.thumbnail}" alt="${product.title}" width="200">
        <p>Code: ${product.code}</p>
        <p>Stock: ${product.stock}</p>
        <p>ID: ${product.id}</p>
      </div>
    `
      )
      .join("");
    res.send(`${productHTML}`);
  } catch (error) {
    res.send("error 500: internal server error");
  }
});

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    let productsToSend = [...products];

    if (!isNaN(limit) && limit > 0) {
      productsToSend = productsToSend.slice(0, limit);
    }

    const productHTML = productsToSend
      .map(
        (product) => `
        <div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>Price: ${product.price}</p>
          <img src="${product.thumbnail}" alt="${product.title}" width="200">
          <p>Code: ${product.code}</p>
          <p>Stock: ${product.stock}</p>
          <p>ID: ${product.id}</p>
        </div>
      `
      )
      .join("");

    res.send(`
      <h2>Lista de Productos:</h2>
      ${productHTML}
    `);
  } catch (error) {
    res.send("error 500: internal server error");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find((product) => product.id === id);

    if (product) {
      res.send(`
        <div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>Price: ${product.price}</p>
          <img src="${product.thumbnail}" alt="${product.title}" width="200">
          <p>Code: ${product.code}</p>
          <p>Stock: ${product.stock}</p>
          <p>ID: ${product.id}</p>
        </div>
      `);
    } else {
      res.send("Producto no encontrado");
    }
  } catch (error) {
    res.send("error 500: internal server error");;
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

