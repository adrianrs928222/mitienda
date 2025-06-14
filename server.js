require("dotenv").config(); // << Carga las variables del .env

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // << Usa la clave protegida

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