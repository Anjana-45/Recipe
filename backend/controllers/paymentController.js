const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const Payment = require("../models/Payment");

exports.processPremiumPayment = async (req, res) => {
  try {
    const user_id = req.user.id; 
    const premium_price = 999 * 100; 
console.log("pay",user_id);

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Premium Membership" },
            unit_amount: premium_price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/premium-success?session_id={CHECKOUT_SESSION_ID}&user_id=${user_id}`,
      cancel_url: "http://localhost:3000/premium-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
};

exports.confirmPremiumPayment = async (req, res) => {
  try {
    const { session_id, user_id } = req.query;

    
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    await User.findByIdAndUpdate(user_id, { isPremium: true });

    const payment = new Payment({
      userId: user_id,
      amount: session.amount_total / 100,
      paymentId: session.payment_intent,
      status: "Success",
    });
    await payment.save();

    res.json({ message: "Premium activated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Payment confirmation failed", error: error.message });
  }
};
