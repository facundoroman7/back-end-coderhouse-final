import {promises as fs} from 'fs'
import ProductManeger from './ProductManeger.js'

const productAll = new ProductManeger

class CartManeger{
    constructor(){
        this.path = "./src/control/carrito.json"
    }

    readCart = async () =>{
        let carrito = await fs.readFile(this.path, "utf-8")

        return JSON.parse(carrito)
    }

    writeCart = async (carrito) =>{
        await fs.writeFile(this.path, JSON.stringify(carrito))
    }

    asist = async (id) =>{
        let carts = await this.readCart()
       return carts.find(carr => carr.id === id)
    }


    addCarrito = async (id) =>{
        let carritosViejos = await this.readCart()
        let carrConcatenado = [{id : id , product : []}, ...carritosViejos]
        await this.writeCart(carrConcatenado)
        return "carrito agregado"
    }

    getCartsById = async (id) =>{
       
        let cartById = await this.asist(id)
        if (!cartById) {
         return "carrito no encontrado"
        }
        return cartById
     }

     addProductCart = async (cartId, productId) =>{
        let cartById = await this.asist(cartId)
        if (!cartById) {
         return "carrito no encontrado"
        }

        let productById = await productAll.asist(productId)

        if (!cartById) {
            return "producto no encontrado"
        }

        let cartsAll = await this.readCart()   
        let cartFilter = cartsAll.filter(carr => carr.id != cartId) 

        if (cartById.product.some(prod => prod.id === productId)) {
            let prodInCart = cartById.product.find(prod => prod.id === productId)

            prodInCart.cantidad + 1

            let cartConcat = [prodInCart, ...cartFilter]

           
             await this.writeCart(cartConcat)
             return "producto  sumado al carrito"
            
        }



        let cartConcatenado = [{id : cartId, product : [{id : productById.id, cantidad: 1 }]}, ...cartFilter]

        await this.writeCart(cartConcatenado)
        return "producto agregado al carrito"
     }
 
    
    
}

export default CartManeger