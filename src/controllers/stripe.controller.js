import Stripe from "stripe";
import  config  from "../config/config.js"

const secret_key_stripe= config.stripe.Secret_key
const stripe = new Stripe(secret_key_stripe)

const HOST = config.server.host

export const createOrderStripe = async(req,res) => {
    let { price } = req.body;

    const { option } = req.body

    price = parseFloat(price);

    const priceInCents = Math.round(price * 100);

    const session = await stripe.checkout.sessions.create({
        line_items: [ {
            price_data: {
                product_data: {
                    name: 'Gimnasio fitland',
                    description: option
                },
                currency: 'usd',
                unit_amount: priceInCents
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: `${HOST}/capture-order-stripe`,
        cancel_url: `${HOST}/cancel-order-stripe`
    })

    res.cookie('option', option, { maxAge: 900000, httpOnly: true });

    return res.json(session)
}

export const captureOrderStripe = async(req,res) => {

    const option = req.cookies.option;

    res.render("successBuy" , {option})
}

export const cancelOrderStripe = async(req,res) => res.send("Cancel Order");