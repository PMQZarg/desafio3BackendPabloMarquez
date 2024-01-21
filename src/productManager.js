import fs from "fs/promises";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/products.json";
  }

  async addProduct(product) {
    await this.getProducts();
    const { title, description, price, thumbnail, code, stock } = product;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son requeridos");
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.log("El codigo del producto ya existe");
      return;
    }

    const id = this.setId();
    const newProduct = { id, ...product };
    this.products.push(newProduct);

    try {
      await fs.writeFile(this.path, JSON.stringify(this.products));
      console.log("Datos guardados con éxito");
    } catch (error) {
      console.error("Error escribiendo en el archivo", error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.products = JSON.parse(data);
      console.log("El archivo se ha leido con éxito");
    } catch (error) {
      console.log("Error leyendo el archivo", error);
    }
    return this.products;
  }

  getProductsById(id) {
    this.getProducts();
    const product = this.products.find((p) => p.id === id);
    if (product === undefined) {
      console.log(`El producto con el id ${id} no existe`);
    } else return product;
  }

  setId() {
    this.lastId = this.getLastProductId();
    if (this.lastId === 0) this.lastId = 1;
    else this.lastId++;
    return this.lastId;
  }
  getLastProductId() {
    if (this.products.length === 0) return 0;
    const lastProductId = this.products[this.products.length - 1].id;
    console.log("Mi último Id es", this.lastProductId);
    return lastProductId;
  }
  async updateProduct(id, productActualizado) {
    await this.getProducts();
    const existingProduct = this.products.find((product) => product.id === id);

    if (existingProduct === undefined) {
      console.error(`El id ${id} no existe`);
      return;
    }
    const indice = this.products.findIndex((product) => product.id === id);
    this.products[indice] = { id, ...productActualizado };

    try {
      await fs.writeFile(this.path, JSON.stringify(this.products));
      console.log("Archivo actualizado con éxito");
    } catch (error) {
      console.error("No se ha podido actualizar el archivo", error);
    }
  }

  deleteProduct(id) {
    this.getProducts();
    if (this.products.find((product) => product.id) === undefined) {
      console.error(`El id $ {id} no existe`);
      return;
    }

    const indice = this.products.findIndex((product) => product.id === id);
    this.products.splice(indice, 1);
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("El producto ha sido borrado");
    } catch (error) {
      console.error("Error borrando el producto", error);
    }
  }
}

const productManager = new ProductManager();

const product1 = {
  title: "Producción Musical Integral Full Banda",
  description: "Formato Full Banda",
  price: 100,
  thumbnail: "miMiniatura",
  code: "pmqz1",
  stock: 7,
};

const product2 = {
  title: "Producción Musical Integral Acústico",
  description: "Formato Acústico",
  price: 60,
  thumbnail: "miMiniatura",
  code: "pmqz2",
  stock: 10,
};

const product3 = {
  title: "Producción Musical Integral Dúo",
  description: "Formato Dúo",
  price: 40,
  thumbnail: "miMiniatura",
  code: "pmqz3",
  stock: 15,
};

const product4 = {
  title: "Transcripción a partitura",
  description: "Traduzco tu música a partituras, melodía y armonía",
  price: 10,
  thumbnail: "miMiniatura",
  code: "pmqz4",
  stock: 14,
};

const product5 = {
  title: "Curso de piano on demand",
  description: "Clases grabadas",
  price: 40,
  thumbnail: "miMiniatura",
  code: "pmqz5",
  stock: 100,
};

const product6 = {
  title: "Curso de piano en vivo",
  description: "Clases online en vivo",
  price: 65,
  thumbnail: "miMiniatura",
  code: "pmqz6",
  stock: 40,
};

const product7 = {
  title: "Réplica Instrumental/Karaoke",
  description:
    "Elegí el tema o canción que quieras y no consigas, yo te lo hago a tu medida",
  price: 60,
  thumbnail: "miMiniatura",
  code: "pmqz7",
  stock: 77,
};

const product8 = {
  title: "Consultoría musical para tu proyecto/negocio/servicio",
  description:
    "Tu objetivo, te acompaño a armar tu plan para concretarlo, con herramientas de Psicología social y Coaching",
  price: 20,
  thumbnail: "miMiniatura",
  code: "pmqz8",
  stock: 25,
};

const product9 = {
  title: "Curso de Canto On demand",
  description: "Curso de canto grabado para que hagas a tu tiempo",
  price: 40,
  thumbnail: "miMiniatura",
  code: "pmqz9",
  stock: 100,
};

const product10 = {
  title: "Curso de canto online en vivo",
  description: "Clases en vivo, grupales o individuales",
  price: 65,
  thumbnail: "miMiniatura",
  code: "pmqz10",
  stock: 40,
};

async function main() {
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);
  await productManager.addProduct(product4);
  await productManager.addProduct(product5);
  await productManager.addProduct(product6);
  await productManager.addProduct(product7);
  await productManager.addProduct(product8);
  await productManager.addProduct(product9);
  await productManager.addProduct(product10);

  let misProductos = await productManager.getProducts();
  console.log(misProductos);

  const pd = productManager.getProductsById(2);
  console.log(pd);

  await productManager.updateProduct(2, product2);
  misProductos = await productManager.getProducts();
  console.log(misProductos);
}

main();

export { productManager };
