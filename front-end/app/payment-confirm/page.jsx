import Link from "next/link";
import { CheckCircle2, CircleAlert, Mail, ShoppingBag } from "lucide-react";

export default async function PaymentConfirmPage({ searchParams }) {
     const params = await searchParams;

     const paymentSucceeded = params?.redirect_status === "succeeded";
     const orderFailed = params?.order_status === "failed";
     const emailFailed = params?.email_status === "failed";
     const cartCleanupFailed = params?.cart_cleanup === "failed";

     return (
          <main className="flex min-h-[70vh] items-center justify-center px-5 py-16">
               <section className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div
                         className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${paymentSucceeded ? "bg-green-100" : "bg-amber-100"
                              }`}
                    >
                         {paymentSucceeded ? (
                              <CheckCircle2 className="h-12 w-12 text-green-600" />
                         ) : (
                              <CircleAlert className="h-12 w-12 text-amber-600" />
                         )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                         {paymentSucceeded ? "Payment Successful!" : "Payment Not Confirmed"}
                    </h1>

                    <p className="mt-4 leading-7 text-gray-600">
                         {paymentSucceeded
                              ? "Thank you for your purchase. Your payment has been confirmed."
                              : "We could not confirm a successful payment. Please check the payment status before trying again."}
                    </p>

                    {paymentSucceeded && (
                         <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 text-left">
                              <div className="flex items-start gap-4">
                                   <Mail className="mt-1 h-6 w-6 shrink-0 text-primary" />

                                   <div>
                                        <h2 className="font-semibold text-gray-900">
                                             Check your email
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                             Please check your inbox for your purchase details. If you
                                             cannot find the message, check your spam or junk folder.
                                        </p>
                                   </div>
                              </div>
                         </div>
                    )}

                    {orderFailed && (
                         <p
                              role="alert"
                              className="mt-5 rounded-lg bg-amber-50 p-4 text-left text-sm leading-6 text-amber-800"
                         >
                              Your payment succeeded, but we could not save the order
                              automatically. Please do not pay again. The order needs to be
                              checked.
                         </p>
                    )}

                    {emailFailed && !orderFailed && (
                         <p
                              role="status"
                              className="mt-5 rounded-lg bg-amber-50 p-4 text-left text-sm leading-6 text-amber-800"
                         >
                              Your payment and order were processed, but the confirmation email
                              could not be sent. Please check your spam folder and verify your
                              email address.
                         </p>
                    )}

                    {cartCleanupFailed && (
                         <p
                              role="status"
                              className="mt-4 text-left text-sm leading-6 text-amber-800"
                         >
                              Your purchase is recorded, but your cart could not be fully cleared.
                              Please do not submit the payment again.
                         </p>
                    )}

                    <Link
                         href="/"
                         className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-teal-600"
                    >
                         <ShoppingBag className="h-5 w-5" />
                         Continue Shopping
                    </Link>
               </section>
          </main>
     );
}
