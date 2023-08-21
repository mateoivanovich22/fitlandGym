import express from "express";
import * as functions from "../controllers/homeLandingController.js"
import { captureOrderPaypal, createOrderPaypal, cancelOrderPaypal } from "../controllers/paypal.controller.js";

import { cancelOrderStripe, captureOrderStripe, createOrderStripe } from "../controllers/stripe.controller.js";

import { captureOrderMercadopago, createOrderMercadopago, receiveWebhook, failureMercadopago, pendingMercadopago } from "../controllers/mercadopago.controller.js";

const router = express.Router();

router.get("/", functions.showLandingPage );

router.get("/checkout", functions.checkOutPage)

// PAYPAL

router.post('/create-order-paypal', createOrderPaypal)
router.get('/capture-order-paypal', captureOrderPaypal)
router.get('/cancel-order-paypal', cancelOrderPaypal)

// STRIPE

router.post('/create-order-stripe', createOrderStripe)
router.get('/capture-order-stripe', captureOrderStripe)
router.get('/cancel-order-stripe', cancelOrderStripe)

// MERCADO PAGO

router.post('/create-order-mercadopago', createOrderMercadopago)
router.get('/success-mercadopago',  captureOrderMercadopago)
router.get('/failure-mercadopago', failureMercadopago)
router.get('/pending-mercadopago', pendingMercadopago)
router.post('/webhook-mercadopago', receiveWebhook)

export default router;