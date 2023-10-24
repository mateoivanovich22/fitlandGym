import 'dotenv/config'
let config= {};

config.server= {
    port: process.env.PORT || 8080,
    host: "https://gymfitland.vercel.app/",
}

config.paypal= {
    clientID: process.env.clientID,
    Secret_key: process.env.secret_key,
    Paypal_api: "https://api-m.paypal.com"
}

config.stripe = {
    Secret_key: process.env.secret_key_stripe 
}

config.mercadogpago = {
    access_token: process.env.access_token_mercadopago
}

export default config;