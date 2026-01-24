import Stripe from "stripe";

/* 🚨 DO NOT INIT STRIPE AT TOP LEVEL */
let stripe;

/* ================= CREATE PAYMENT INTENT ================= */
export const createPaymentIntent = async (req, res) => {
  try {
    /* ✅ INIT STRIPE INSIDE FUNCTION */
    if (!stripe) {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: error.message });
  }
};
