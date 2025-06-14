<<<<<<< HEAD
require("dotenv").config(); // << Carga las variables del .env

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // << Usa la clave protegida
=======
// server.js
const express = require('express');
const stripe = require('stripe')('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'); // <-- Sustituye esto
>>>>>>> c5b2c4c7547082ac34ae98c1e7e79a116dce5b33

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Almohada Premium",
          },
          unit_amount: 2999, // €29.99 en céntimos
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://tusitio.com/success",
    cancel_url: "https://tusitio.com/cancel",
  });

  res.json({ id: session.id });
});