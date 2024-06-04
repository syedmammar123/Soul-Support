import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayementForms from "./PaymentForms";

const StripeContainer = () => {
  const PUBLIC_KEY =
    "pk_test_51NS67qAixrBBKI7AqfhoLyQDDPBYw6XpS6u9K6jwJPSZwSjCqSTHYsWD6FVcg7JzySqvyLRNlFclKOfmkmgy6dXf00upWhsLDT";

  const stripePromise = loadStripe(PUBLIC_KEY );

  return (
    <div>
      <Elements stripe={stripePromise} >
        <PayementForms />
      </Elements>
    </div>
  );
};

export default StripeContainer;
