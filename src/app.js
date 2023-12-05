import express from 'express';
import routerProd from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import * as path from "path"
import ProductManeger from './componentes.clases/ProductManeger.js';


const app = express();

const Port = 8080

const product = new ProductManeger();

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

//estructura handlebars
app.engine("handlebars", engine())
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

app.use("/api/cart", cartRouter)

app.listen(Port, () =>{
    console.log(`servidor en el puerto ${Port}`);
})