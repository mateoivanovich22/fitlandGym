
import mercadopago from "mercadopago";

import config from "../config/config.js";

const HOST = config.server.host
const access_token = config.mercadogpago.access_token

export const createOrderMercadopago = async(req,res) => {
    // let { price } = req.body;
    let price = 25

    const { option } = req.body

    mercadopago.configure({
        access_token: access_token,

    })

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: option,
                unit_price: price,
                currency_id: "ARS",
                quantity: 1,
            }
        ],
        back_urls: {
            success: `${HOST}/success-mercadopago`,
            failure: `${HOST}/failure-mercadopago`,
            pending: `${HOST}/pending-mercadopago`
        },
        notification_url: `${HOST}/webhook-mercadopago`
    })

    // console.log(result)
    
    res.send(result)
}

export const receiveWebhook = async (req, res) => {
    const payment = req.query

    try{

        if(payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)

            //store in database
        }

        
        res.sendStatus(204)

    }catch (err) {
        console.log(err)

        return res.sendStatus(500).json({error: err.message})
    }
}

export const captureOrderMercadopago = async(req,res) => {
    const option = req.body.option

    res.render("successBuy" , {option})
}

export const cancelOrderMercadopago = async(req,res) => res.send("Cancel Order");

export const failureMercadopago = (req,res) => res.send("failure-mercadopago")

export const pendingMercadopago = (req,res) => res.send("pending-mercadopago")