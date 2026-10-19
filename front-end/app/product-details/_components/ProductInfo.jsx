"use client";

import React, { useContext, useState } from "react";
import { ShoppingCart, BadgeCheck, AlertOctagon } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../_utils/CartApis";
import { CartContext } from "../../_context/CartContext";

function ProductInfo({ product }) {
     const { user } = useUser();
     const router = useRouter();
     const { setCart } = useContext(CartContext);
     const [isAddingToCart, setIsAddingToCart] = useState(false);
     const [cartMessage, setCartMessage] = useState("");
     const [cartMessageIsError, setCartMessageIsError] = useState(false);

     const handleAddToCart = async () => {
          if (!user) {
               router.push("/sign-in");
               return;
          }
          const email = user.primaryEmailAddress?.emailAddress;
          if (!email || !product?.documentId) {
               setCartMessage("We couldn’t add this product. Please try again.");
               setCartMessageIsError(true);
               return;
          }
          setIsAddingToCart(true);
          setCartMessage("");
          setCartMessageIsError(false);
          const payload = {
               data: {
                    username: user.fullName || "",
                    email,
                    products: {
                         connect: [product.documentId],
                    },
               },
          };
          try {
               const res = await CartApis.addToCart(payload);
               const createdCart = res?.data?.data;
               setCart((oldCart) => [
                    ...oldCart,
                    {
                         id: createdCart?.documentId,
                         product,
                    },
               ]);
               setCartMessage("Added to your cart.");
          } catch {
               setCartMessage("We couldn’t add this product. Please try again.");
               setCartMessageIsError(true);
          } finally {
               setIsAddingToCart(false);
          }
     };

     return (
          <div>
               {product?.id ? (
                    <div>
                         <h2 className="text-[20px]">{product?.title}</h2>
                         <h2 className="text-[15px] text-gray-400">{product?.category}</h2>
                         <h2 className="mt-2 text-[11px]">
                              {product?.Descriotion?.[0]?.children?.[0]?.text}
                         </h2>

                         <h2 className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
                              {product?.instantDelivery ? (
                                   <BadgeCheck className="h-5 w-5 text-green-500" />
                              ) : (
                                   <AlertOctagon />
                              )}
                              Eligible For Instant Delivery
                         </h2>

                         <h2 className="mt-2 text-[24px] text-primary">$ {product?.price}</h2>

                         <button
                              type="button"
                              onClick={handleAddToCart}
                              disabled={isAddingToCart}
                              className="flex gap-2 rounded-lg bg-primary p-2 text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                         >
                              <ShoppingCart />
                              {isAddingToCart ? "Adding..." : "Add To Cart"}
                         </button>

                         {cartMessage && (
                              <p
                                   role={cartMessageIsError ? "alert" : "status"}
                                   className={`mt-2 text-sm ${cartMessageIsError ? "text-red-600" : "text-green-700"}`}
                              >
                                   {cartMessage}
                              </p>
                         )}
                    </div>
               ) : (
                    <SkeletonProductInfo />
               )}
          </div>
     );
}

export default ProductInfo;
