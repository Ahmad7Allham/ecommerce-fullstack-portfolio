
"use client";

import React, { Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CheckoutForm from "./_components/CheckoutForm";

const stripePromise = loadStripe(
     process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY
);

function CheckoutContent() {
     const searchParams = useSearchParams();
     const amountParam = searchParams.get("amount");
     const amount = Number(amountParam);
     const amountInCents = Math.round(amount * 100);

     // Do not render a payment form for an invalid or empty cart total.
     if (
          !amountParam ||
          !Number.isFinite(amount) ||
          amountInCents < 50
     ) {
          return (
               <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                         Your checkout total is invalid
                    </h1>

                    <p className="mt-3 text-gray-600">
                         Please return to your cart and check your items before
                         continuing.
                    </p>

                    <Link
                         href="/cart"
                         className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-teal-600"
                    >
                         Return to Cart
                    </Link>
               </main>
          );
     }

     return (
          <Elements
               key={amountInCents}
               stripe={stripePromise}
               options={{
                    mode: "payment",
                    amount: amountInCents,
                    currency: "usd",
               }}
          >
               <CheckoutForm amount={(amountInCents / 100).toFixed(2)} />
          </Elements>
     );
}

export default function CheckoutPage() {
     return (
          <Suspense
               fallback={
                    <main className="flex min-h-[60vh] items-center justify-center px-6">
                         <div role="status" className="text-center">
                              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600" />

                              <p className="mt-4 text-gray-600">
                                   Preparing secure checkout...
                              </p>
                         </div>
                    </main>
               }
          >
               <CheckoutContent />
          </Suspense>
     );
}
