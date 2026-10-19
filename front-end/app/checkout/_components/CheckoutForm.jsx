"use client";

import {
     useStripe,
     useElements,
     PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import OrderApi from "../../_utils/OrderApis";
import CartApis from "../../_utils/CartApis";

const CheckoutForm = ({ amount }) => {
     const { cart, setCart } = useContext(CartContext);
     const { user } = useUser();
     const stripe = useStripe();
     const elements = useElements();
     const router = useRouter();

     const [loading, setLoading] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");

     const createOrder = async () => {
          const email = user?.primaryEmailAddress?.emailAddress;

          if (!email) {
               throw new Error("We could not identify your email address.");
          }

          // Strapi 5 relationships should use product documentIds.
          const productDocumentIds = [
               ...new Set(cart.map((item) => item?.product?.documentId).filter(Boolean)),
          ];

          if (productDocumentIds.length === 0) {
               throw new Error("Your cart does not contain any valid products.");
          }

          const payload = {
               data: {
                    email,
                    username: user.fullName || "Customer",
                    amount,
                    products: {
                         connect: productDocumentIds,
                    },
               },
          };

          return OrderApi.createOrder(payload);
     };

     const sendEmail = async () => {
          const response = await fetch("/api/send-email", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    amount,
                    email: user.primaryEmailAddress.emailAddress,
                    fullName: user.fullName,
               }),
          });

          if (!response.ok) {
               throw new Error("The confirmation email could not be sent.");
          }
     };

     const handleSubmit = async (event) => {
          event.preventDefault();

          if (loading) return;

          if (!stripe || !elements) {
               setErrorMessage("The payment form is still loading.");
               return;
          }

          if (!user || !cart.length) {
               setErrorMessage("Please sign in and make sure your cart is not empty.");
               return;
          }

          setLoading(true);
          setErrorMessage("");

          let paymentSucceeded = false;

          try {
               // 1. Validate the Payment Element.
               const { error: submitError } = await elements.submit();

               if (submitError) {
                    throw new Error(submitError.message);
               }

               // 2. Ask our server to create the Stripe PaymentIntent.
               const intentResponse = await fetch("/api/create-intent", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount }),
               });

               if (!intentResponse.ok) {
                    throw new Error("We could not start the payment.");
               }

               const clientSecret = await intentResponse.json();

               // 3. Confirm the payment before creating the order.
               const { error: paymentError, paymentIntent } =
                    await stripe.confirmPayment({
                         elements,
                         clientSecret,
                         redirect: "if_required",
                         confirmParams: {
                              return_url: `${window.location.origin}/payment-confirm`,
                         },
                    });

               if (paymentError) {
                    throw new Error(paymentError.message);
               }

               if (paymentIntent?.status !== "succeeded") {
                    throw new Error(
                         "Payment has not been confirmed. Please check its status before trying again.",
                    );
               }

               paymentSucceeded = true;

               // 4. Record the order only after payment succeeds.
               try {
                    await createOrder();
               } catch (error) {
                    console.error("Order creation failed after payment:", error);

                    router.replace(
                         "/payment-confirm?redirect_status=succeeded&order_status=failed",
                    );
                    return;
               }

               // 5. Email failure must not be presented as payment failure.
               let emailSent = true;

               try {
                    await sendEmail();
               } catch (error) {
                    emailSent = false;
                    console.error("Confirmation email failed:", error);
               }

               // 6. Remove the cart records after the order is created.
               const deletionResults = await Promise.allSettled(
                    cart.map((item) => CartApis.deleteCartItem(item.id)),
               );

               const cartCleanupFailed = deletionResults.some(
                    (result) => result.status === "rejected",
               );

               setCart([]);

               // 7. Tell the success page what needs to be displayed.
               const query = new URLSearchParams({
                    redirect_status: "succeeded",
               });

               if (!emailSent) {
                    query.set("email_status", "failed");
               }

               if (cartCleanupFailed) {
                    query.set("cart_cleanup", "failed");
               }

               router.replace(`/payment-confirm?${query.toString()}`);
          } catch (error) {
               console.error("Checkout failed:", error);

               if (paymentSucceeded) {
                    // Never tell the user to pay again after payment succeeded.
                    router.replace(
                         "/payment-confirm?redirect_status=succeeded&order_status=failed",
                    );
                    return;
               }

               setErrorMessage(
                    error instanceof Error
                         ? error.message
                         : "Something went wrong during checkout.",
               );
          } finally {
               setLoading(false);
          }
     };

     return (
          <form onSubmit={handleSubmit}>
               <div className="mx-auto mt-12 w-full max-w-xl px-6">
                    <PaymentElement />

                    {errorMessage && (
                         <p
                              role="alert"
                              className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                         >
                              {errorMessage}
                         </p>
                    )}

                    <button
                         type="submit"
                         disabled={!stripe || !elements || loading}
                         className="mt-4 w-full rounded-md bg-primary p-3 text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                         {loading ? "Processing payment..." : "Submit"}
                    </button>
               </div>
          </form>
     );
};

export default CheckoutForm;
