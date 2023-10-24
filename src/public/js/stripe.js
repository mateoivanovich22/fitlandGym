
const stripeBotton = document.getElementById("stripeBotton");

stripeBotton.addEventListener("click", async () => {

    const price = stripeBotton.dataset.price;
    const option = stripeBotton.dataset.option;

    const response = await fetch("/create-order-stripe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, option }),
    })

    const data = await response.json()

    window.location.href = data.url

})