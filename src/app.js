import express from 'express';
import routerProd from "./router/product.router.js"
import cartRouter from "./router/cart.router.js"
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import * as path from "path"
import ProductManeger from './componentes.clases/ProductManeger.js';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import viewsRouter from "../src/router/views.router.js"
import { env } from "../src/env/env.js";
import mongoose from 'mongoose';


const app = express();

const Port = 8080




const product = new ProductManeger();

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

//estructura handlebars
app.engine("handlebars", engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}) )
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static

app.use("/" , express.static(__dirname + "/public"))

app.get("/", async (req, res) =>{

    let allProducts = await product.getProducts()
    
    res.render("home", {
        title: "Titulo | Libros",
        products: allProducts
    })
})


app.use("/api/products", routerProd)
app.use("/", viewsRouter)

app.use("/api/cart", cartRouter)

io.on("connection", (socket) =>{
    console.log("nuevo cliente concectado");

    socket.on("post_send", async (data) => {
        console.log(data);
        try {
            // const productos = new productos (
            //     data.Nombre,
            //     data.description,
            //     Number(data.price),
            //     Number(data.id),
            // )
            let products = await product.getProducts();
            socket.emit("products", products);
        } catch (err) {
            console.log(err);
        }
    });
})

app.listen(Port, () =>{
    console.log(`servidor en el puerto ${Port}`);
})


mongoose
.connect(`mongodb+srv://facundoromanagustin01:${env}@cluster0.abqaqz9.mongodb.net/?retryWrites=true&w=majority`)
.then(db => console.log(`db conectado ${db}`))
.catch(err => console.log(`Hubo un problema al conectarse al db ${err}` ))