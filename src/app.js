//Desarrollar servidor basado en express
// utilizar clase ProductManager.

/*Desarrollar servidor express app.js que importe al archivo ProductManager, 
importante esto ya que hay que tener por lo menos 10 productos.*/

import express from "express";
import { productManager } from "./productManager.js";
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
//Endpoint limitando consultas sobre productos

app.get("/products", async (req, res) => {
  const productos = await productManager.getProducts();
  res.json(productos);

  let limit = parseInt(req.query.limit);
  let productsLimited = [...productos];

  if (!isNaN(limit) && limit > 0) {
    limitedProducts = productsLimited.slice(o, limit);
  }

  res.json(limitedProducts);
});

app.get("/products/:pid", async (req, res) => {
  let productId = parseInt(req.params.pid);
  const productos = await productManager.getProductsById(productId);
  //const product = products.find((p) => p.id === productId);
  if (!productos) {
    res
      .status(404)
      .json({ error: `Producto con Id ${productId} no encontrado` });
  } else {
    res.json(productos);
  }
});

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});
