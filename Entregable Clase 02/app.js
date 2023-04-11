class ProductManager {
  //contructor clear
  constructor() {
    this.products = [];
  }

  //method to add products to our variable products
  addProduct(title, description, price, thumbnail, code, stock) {
    if (title ?? description ?? price ?? thumbnail ?? code ?? stock) {
      if (this.products.find((product) => product.code === code)) {
        console.log("The product already exists");
      } else {
        this.products.push({
          id: this.products.length + 1,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        });
        console.log("The product was added successfully.");
      }
    }
  }

  //method to know products within our variable products
  getProducts() {
    console.log(this.products);
    return this.products;
  }

  //method to know a product within our variable products
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      console.log(product);
      return product;
    } else {
      console.log("Not found");
    }
  }
}

//we add product
const deposit = new ProductManager();
deposit.addProduct(
  "Notebook",
  "Notebook HP 15s",
  150000,
  "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
  123456,
  10
);

//We add product with repeated code to generate error
deposit.addProduct(
  "Monitor",
  "Monitor Samsung 24",
  100000,
  "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
  123456,
  10
);

//we add product
deposit.addProduct(
    "Monitor",
    "Monitor Samsung 24",
    100000,
    "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
    567123,
    10
  );

//we get all products
deposit.getProducts();

//we get a product by id
deposit.getProductById(1);

//we get a product by id to generate error
deposit.getProductById(3);
