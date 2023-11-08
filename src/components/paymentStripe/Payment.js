import React from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "../../assets/images/logo.jpg";

export default function Payment() {
  const handleToken = async (token, adresses) => {
    console.log(
      "🚀 ~ file: Payment.js:6 ~ handleToken ~ token:",
      token,
      adresses
    );
  };
  return (
    <StripeCheckout
      token={handleToken}
      image={logo}
      billingAddress
      amount={15 * 100}
      currency="USD"
      name="Update to Pro Version"
      stripeKey="sk_test_51Ny3rpFX2CDVz062Nqo3OfXOdc2Go5tMuAp7MrLAh3C8NN7v4qV1vI0ir9OG6Dsgfa7IrVxFx6frK06YSaSLZFGE00I51hHabP"
    >
      Buy Pro
    </StripeCheckout>
  );
}
