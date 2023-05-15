import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/cart.router.js";
import { __dirname } from './utils.js';
import path from 'path';
import handlebars from "express-handlebars"
import { Server } from 'socket.io';
import {productRouterHtml} from './routes/home.router.js';
import {realTimeRouterSockets} from './routes/realTimeProducts.router.js';
import { ProductManager } from "./productManager.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Socket.io webSockets
const httpServer = app.listen(port, () => {
    console.log(`🚀 Server on and running on port: http://localhost:${port} 🚀`)
});

//socket.io
const socketServer = new Server(httpServer);

//api rest con handlebars
app.use('/html/product', productRouterHtml);

//
app.use('/realtimeproducts', realTimeRouterSockets);

// Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+ "/views")
app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)



socketServer.on("connection", (socket) => {
    console.log("Un cliente se ha conectado " + socket.id);
    socket.emit('mensaje', 'Bienvenido!');
    
    socket.on("newProduct", async (req, res) => {
        const products = new ProductManager("./productos.json");
        await products.addProduct(req)
        socketServer.emit("newProduct", req);
    })
});


app.get("*"), (req, res, next) => {
    res.status(404).json({status: "error", msg: "Not Found", data: {} })
}