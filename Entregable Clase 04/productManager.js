const fs = require("fs")

class ProductManager {
    //contructor clear
    constructor(path) {
        this.path = path;
        if (fs.existsSync(path)) {
            const productsString = fs.readFileSync(this.path, "utf-8")
            const productsFile = JSON.parse(productsString)
            this.products = productsFile
        } else {
            fs.writeFileSync(path, "[]")
            this.products = productsFile
        }


    }

    //method to add products to our variable products
    addProduct(title, description, price, thumbnail, code, stock) {
        if (title && description && price && thumbnail && code && stock) {
            if (this.products.find((product) => product.code === code)) {
                return ("The product already exists");
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
                const productsString = JSON.stringify(this.products, null, 2)
                fs.writeFileSync(this.path, productsString)
            }
        }
    }

    //method to know products within our variable products
    getProducts() {
        const productsString = fs.readFileSync(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        return productsFile
    }

    //method to know a product within our variable products
    getProductById(id) {
        const productsString = fs.readFileSync(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        const product = productsFile.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            return ("No existe el producto");
        }
    }

    //method for update product
    updateProduct(id, title, description, price, thumbnail, code, stock) {
        const productsString = fs.readFileSync(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        const product = productsFile.find((product) => product.id === id);
        if (product) {
            product.title = title
            product.description = description
            product.price = price
            product.thumbnail = thumbnail
            product.code = code
            product.stock = stock
            const productsString = JSON.stringify(productsFile, null, 2)
            fs.writeFileSync(this.path, productsString)
            return product
        }
    }

    //method for delete product
    deleteProduct(id) {
        const productsString = fs.readFileSync(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        const product = productsFile.find((product) => product.id === id);
        if (product) {
            const index = productsFile.indexOf(product)
            productsFile.splice(index, 1)
            const productsString = JSON.stringify(productsFile, null, 2)
            fs.writeFileSync(this.path, productsString)
            return product
        }
    }
}

//we add product
const productManager = new ProductManager("productos.json");
productManager.addProduct(
    "Notebook",
    "Notebook HP 15s",
    150000,
    "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
    123456,
    10
);

// //We add product with repeated code to generate error
// productManager.addProduct(
//     "Monitor",
//     "Monitor Samsung 24",
//     100000,
//     "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
//     3312,
//     10
// );

productManager.updateProduct(
    2,
    "Monitor",
    "Monitor Samsung 23",
    100000,
    "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
    3312,
    10
);

// //we add product
// productManager.addProduct(
//     "Monitor",
//     "Monitor Samsung 24",
//     100000,
//     "https://http2.mlstatic.com/D_NQ_NP_2X_939115-MLA45020214253_102020-O.webp",
//     567123,
//     10
// );

//we get all products
productManager.getProducts();

//we get a product by id
productManager.getProductById(2);

//delete product
productManager.deleteProduct(2);
