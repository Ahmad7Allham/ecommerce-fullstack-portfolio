import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import Link from "next/link";

function Cart() {
     const { cart } = useContext(CartContext);

     return (
          <div
               className="absolute right-10 top-12 z-10 mx-10 h-75 w-62.5 overflow-auto rounded-md border bg-gray-100 p-5 shadow-sm"
          >
               {cart?.length > 0 ? (
                    <div className="mt-4 space-y-6">
                         <ul className="space-y-4">
                              {cart.map((item) => (
                                   <li key={item?.id} className="flex items-center gap-4">
                                        <img
                                             src={item?.product?.banner?.url}
                                             alt={item?.product?.title || "Product"}
                                             className="h-16 w-16 rounded object-cover"
                                        />
                                        <div>
                                             <h3 className="line-clamp-1 text-sm text-gray-900">
                                                  {item?.product?.title}
                                             </h3>
                                             <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                  <div>
                                                       <dt className="inline">Category:</dt>{" "}
                                                       <dd className="inline">{item?.product?.category}</dd>
                                                  </div>
                                                  <div>
                                                       <dt className="inline">Price:</dt>{" "}
                                                       <dd className="inline text-primary">
                                                            {item?.product?.price}
                                                       </dd>
                                                  </div>
                                             </dl>
                                        </div>
                                   </li>
                              ))}
                         </ul>
                    </div>
               ) : (
                    <p className="mt-8 text-center text-sm text-gray-600">
                         Your cart is empty.
                    </p>
               )}

               <div className="mt-5 space-y-4 text-center">
                    <Link
                         href="/cart"
                         className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                         View my cart ({cart?.length || 0})
                    </Link>
                    <Link
                         href="/#products"
                         className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                    >
                         Continue shopping
                    </Link>
               </div>
          </div>
     );
}

export default Cart;
