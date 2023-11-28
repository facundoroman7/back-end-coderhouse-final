import express from 'express';
import ProductManeger from './componentes.clases/ProductManeger.js';


const product = new ProductManeger();

const app = express();

const Port = 8080

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

app.get("/products" , async (req, res) => {
    
    res.send(await product.getProducts())

} )


app.get("/products/:id" , async (req, res) => {
    let id = parseInt(req.params.id)
    res.send(await product.getProductsById(id))

} )

app.post("/products", async (req, res) =>{
    let newproduct = req.body
    res.send(await product.addProductos(newproduct))
})

app.put("/products/:id", async ( req, res) => {
    let id = parseInt(req.params.id)
    let upDateProd = req.body
    res.send(await product.upDateProd(id, upDateProd))
})


app.delete("/products/:id", async ( req, res) =>{
    let id = parseInt(req.params.id)
    res.send(await product.deleteProd(id))
})

app.listen(Port, () =>{
    console.log(`servidor en el puerto ${Port}`);
})