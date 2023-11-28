import { Router } from "express";
import CartManeger from "../componentes.clases/CartManeger.js";

const cartRouter = Router()

const cart = new CartManeger

cartRouter.post("/", async (req, res) =>{
    res.send(await cart.addCarrito())
})

cartRouter.get("/", async (req, res) =>{
    res.send(await cart.readCart())
})

cartRouter.get("/:id", async (req, res) =>{
    res.send(await cart.getCartsById(req.params.id))
})

cartRouter.post("/:cid/products/pid", async (req, res) =>{
    let cartId = req.params.cid
    let productId = req.params.pid

    res.send(await cart.addProductCart(cartId, productId))
})

export default cartRouter