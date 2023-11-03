const paypalBotton = document.getElementById("paypalBotton");

const botonMenu = document.getElementById("botonMenu");

botonMenu.addEventListener("click", () => {
    window.location.href = "/"
})

paypalBotton.addEventListener("click", async () => {

    const price = paypalBotton.dataset.price;
    const option = paypalBotton.dataset.option;

    const response = await fetch("/create-order-paypal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ price , option}),
    })

    const data = await response.json()

    window.location.href = data.links[1].href

} )