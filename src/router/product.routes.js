import { Router } from "express";

import ProductManeger from '../componentes.clases/ProductManeger.js';

const routerProd = Router()


const product = new ProductManeger();



routerProd.get("/" , async (req, res) => {
    
    res.send(await product.getProducts())

} )


routerProd.get("/:id" , async (req, res) => {
    let id = parseInt(req.params.id)
    res.send(await product.getProductsById(id))

} )

routerProd.post("/", async (req, res) =>{
    let newproduct = req.body
    res.send(await product.addProductos(newproduct))
})

routerProd.put("/:id", async ( req, res) => {
    let id = parseInt(req.params.id)
    let upDateProd = req.body
    res.send(await product.upDateProd(id, upDateProd))
})


routerProd.delete("/:id", async ( req, res) =>{
    let id = parseInt(req.params.id)
    res.send(await product.deleteProd(id))
})


export default routerProd