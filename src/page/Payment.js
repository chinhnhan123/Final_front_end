// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";

// const schema = yup.object().shape({
//   nameCategory: yup.string().required("Category name is required"),
//   kilogram: yup.number().required("Kilogram is required"),
//   description: yup.string().required("Description is required"),
//   daysToRaisePigs: yup.number().required("Days to raise pigs is required"),
// });

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   console.log("🚀 ~ file: Payment.js:24 ~ CheckoutForm ~ elements:", elements);

//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     console.log("🚀 ~ file: Payment.js:28 ~ handleSubmit ~ event:", event);
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }

//     // // Create the PaymentIntent and obtain clientSecret from your server endpoint
//     // const res = await fetch('/create-intent', {
//     //   method: 'POST',
//     // });

//     // const {client_secret: clientSecret} = await res.json();

//     // const {error} = await stripe.confirmPayment({
//     //   //`Elements` instance that was used to create the Payment Element
//     //   elements,
//     //   clientSecret,
//     //   confirmParams: {
//     //     return_url: 'https://example.com/order/123/complete',
//     //   },
//     // });

//     // if (error) {
//     //   // This point will only be reached if there is an immediate error when
//     //   // confirming the payment. Show error to your customer (for example, payment
//     //   // details incomplete)
//     //   setErrorMessage(error.message);
//     // } else {
//     //   // Your customer will be redirected to your `return_url`. For some payment
//     //   // methods like iDEAL, your customer will be redirected to an intermediate
//     //   // site first to authorize the payment, then redirected to the `return_url`.
//     // }
//   };

//   return (
//     <div className="w-full h-full bg-white flex">
//       <div className="w-1/2 p-10">
//         <h1>Payment</h1>
//       </div>
//       <div className="w-1/2 p-10">
//         <form onSubmit={handleSubmit}>
//           <div className="w-[80%]">
//             <div>
//               <label htmlFor="email">Email</label>
//               <input id="email" type="email" name="email" />
//             </div>
//             <PaymentElement />
//             <button type="submit" disabled={!stripe}>
//               Pay
//             </button>
//           </div>
//         </form>
//       </div>
//       {errorMessage && <div>{errorMessage}</div>}
//     </div>
//   );
// };

// const stripePromise = loadStripe(
//   "pk_test_51Ny3rpFX2CDVz062cwlcYGiTAzsduZ0PWXdNkNLWhOVtyh8rioqN0EwJXUJWJthIU9TyZtspW79gbWSUFm7M9cp500s9ZaEyBc"
// );

// const options = {
//   mode: "payment",
//   amount: 1099,
//   currency: "usd",
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// const App = () => (
//   <Elements stripe={stripePromise} options={options}>
//     <CheckoutForm />
//   </Elements>
// );

// export default App;
