const socket = io()

const form = document.querySelector("form")

form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const formData = new FormData(form)
    const postProduct = {
        Nombre: formData.get("Nombre"),
        description: formData.get("description"),
        price: formData.get("price"),
    }

    console.log(postProduct);

   socket.emit("post_send", postProduct)
   form.reset()
})


socket.on("products", (data) => {
    const prod = document.querySelector("#post")

    const p = document.createElement("p")
    p.innerText = `id: ${data.id}  - nombre: ${data.Nombre} - descipcion: ${data.description} - precio: ${data.price}`
    prod.appendChild(p)
})