import { application } from "express"
import  config  from "../config/config.js"
import axios from "axios"

const HOST = config.server.host
const paypal_api = config.paypal.Paypal_api

const paypal_api_client = config.paypal.clientID
const paypal_api_secretKey = config.paypal.Secret_key

export const createOrderPaypal = async (req,res) => {
    const { price } = req.body;
    const { option } = req.body;

    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: price
                }
            },
        ],
        application_context: {
            brand_name: option,
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order-paypal`,
            cancel_url: `${HOST}/cancel-order-paypal`
        }
    }

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');

    const {data: {access_token}} = await axios.post(`${paypal_api}/v1/oauth2/token`, params, {
        auth: {
            username: paypal_api_client,
            password: paypal_api_secretKey
        }
    })


    const response = await axios.post(`${paypal_api}/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    res.cookie('option', option, { maxAge: 900000, httpOnly: true });

    return res.json(response.data)

}

export const captureOrderPaypal = async(req,res) => {
    const { token }= req.query
    const option = req.cookies.option;
    const response = await axios.post( `${paypal_api}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: paypal_api_client,
            password: paypal_api_secretKey  

        }
    })

    return res.render('successBuy', {option})
}

export const cancelOrderPaypal = (req,res) => {
    res.render("landingHome")
}

