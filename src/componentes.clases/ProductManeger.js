import {promises as fs} from 'fs'


class ProductManeger {
    constructor(){
        this.path = "./src/control/products.json"
    }

    readProduct = async () =>{
        let products = await fs.readFile(this.path, "utf-8")

        return JSON.parse(products)
    }

    writeProduct = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    asist = async (id) =>{
        let products = await this.readProduct()
       return products.find(prod => prod.id === id)
    }


    addProductos = async (product) =>{
        
        let productsViejos = await this.readProduct()
        let productAll = [...productsViejos, product]
        await this.writeProduct(productAll)
        
        return "productos agregado"
    }

    getProducts = async () =>{
        return await this.readProduct()
    }

    getProductsById = async (id) =>{
       
       let prodById = await this.asist(id)
       if (!prodById) {
        return "producto no encontrado"
       }
       return prodById
    }

   

    upDateProd = async (id, product) =>{
        let prodById = await this.asist(id)

        if (!prodById) {
            return "producto no encontrado"
        }


        await this.deleteProd(id)

        let prodOld = await this.readProduct()

        let prod = [{...product, id: id}, ...prodOld]

        await this.writeProduct(product)
        
    }

    deleteProd = async (id) =>{
        let products = await this.readProduct()
        let existProd = products.some(prod => prod.id === id)
        if (existProd) {
            let prodFiltrado = products.filter(prod => prod.id != id)
            await this.writeProduct(prodFiltrado)
            return "producto eliminado"
        }

        return "El producto no existe"
    }

    
}

export default ProductManeger


