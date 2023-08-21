const mercadoPagoBotton = document.getElementById("mercadoPagoBotton");

mercadoPagoBotton.addEventListener("click", async () => {
    const price = mercadoPagoBotton.dataset.price;
    const option = mercadoPagoBotton.dataset.option;

    const response = await fetch("/create-order-mercadopago", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ price , option}),
    })

    const data = await response.json()
    
    window.location.href = data.body.init_point

} )