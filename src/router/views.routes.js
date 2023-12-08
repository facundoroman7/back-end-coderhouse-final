import { Router } from "express";

const router = Router()

router.get("/", (req, res) =>{
    res.render("home.handlebars")
})

router.get("/realtimeproducts", (req, res) =>{
    res.render("product.handlebars")
})

export default router ;