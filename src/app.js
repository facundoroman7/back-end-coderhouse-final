import express from 'express';
import routerProd from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"

const app = express();

const Port = 8080

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

app.use("/api/products", routerProd)

app.use("/api/cart", cartRouter)

app.listen(Port, () =>{
    console.log(`servidor en el puerto ${Port}`);
})