"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import { useRouter } from "next/navigation";

function Cart() {
     const router = useRouter();
     const { cart, setCart } = useContext(CartContext);
     const [deleteError, setDeleteError] = useState("");
     const [deletingId, setDeletingId] = useState(null);

     const getTotalAmount = () =>
          cart.reduce((total, item) => total + Number(item?.product?.price || 0), 0);

     const deleteCartItemFromList = async (documentId) => {
          setDeleteError("");
          setDeletingId(documentId);

          try {
               await CartApis.deleteCartItem(documentId);
               setCart((oldCart) => oldCart.filter((item) => item.id !== documentId));
          } catch {
               setDeleteError("We couldn’t remove this item. Please try again.");
          } finally {
               setDeletingId(null);
          }
     };

     return (
          <section>
               <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                         <header className="text-center">
                              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                   Your Cart
                              </h1>
                         </header>

                         {cart?.length > 0 ? (
                              <div className="mt-8">
                                   <ul className="space-y-4">
                                        {cart.map((item) => (
                                             <li key={item.id} className="flex items-center gap-4">
                                                  <img
                                                       src={item?.product?.banner?.url}
                                                       alt={item?.product?.title || "Product"}
                                                       className="h-16 w-16 rounded object-cover"
                                                  />

                                                  <div>
                                                       <h3 className="text-sm text-gray-900">
                                                            {item?.product?.title}
                                                       </h3>
                                                       <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                            <div>
                                                                 <dt className="inline">Category:</dt>{" "}
                                                                 <dd className="inline">{item?.product?.category}</dd>
                                                            </div>
                                                       </dl>
                                                  </div>

                                                  <div className="flex flex-1 items-center justify-end gap-2">
                                                       ${Number(item?.product?.price || 0).toFixed(2)}
                                                       <button
                                                            type="button"
                                                            onClick={() => deleteCartItemFromList(item.id)}
                                                            disabled={deletingId === item.id}
                                                            aria-label={`Remove ${item?.product?.title || "product"} from cart`}
                                                            className="text-gray-600 transition hover:text-red-600 disabled:opacity-50"
                                                       >
                                                            {deletingId === item.id ? "Removing…" : "Remove"}
                                                       </button>
                                                  </div>
                                             </li>
                                        ))}
                                   </ul>

                                   {deleteError && (
                                        <p role="alert" className="mt-4 text-sm text-red-600">
                                             {deleteError}
                                        </p>
                                   )}

                                   <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                        <div className="w-screen max-w-lg space-y-4">
                                             <dl className="space-y-0.5 text-sm text-gray-700">
                                                  <div className="flex justify-end gap-5 text-base font-medium">
                                                       <dt>Total :</dt>
                                                       <dd>${getTotalAmount().toFixed(2)}</dd>
                                                  </div>
                                             </dl>

                                             <div className="flex justify-end">
                                                  <button
                                                       type="button"
                                                       onClick={() =>
                                                            router.push(`/checkout?amount=${getTotalAmount().toFixed(2)}`)
                                                       }
                                                       className="rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                                  >
                                                       Checkout
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                                   <p className="text-[12px] text-gray-400">
                                        Note: All items will be sent via email.
                                   </p>
                              </div>
                         ) : (
                              <div className="mt-8 text-center">
                                   <p className="text-gray-600">Your cart is empty.</p>
                                   <button
                                        type="button"
                                        onClick={() => router.push("/#products")}
                                        className="mt-4 rounded bg-gray-700 px-5 py-3 text-sm text-white transition hover:bg-primary"
                                   >
                                        Continue shopping
                                   </button>
                              </div>
                         )}
                    </div>
               </div>
          </section>
     );
}

export default Cart;
