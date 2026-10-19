"use client";

import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { useParams } from "next/navigation";
import BreadCrumb from "../../_components/BreadCrump";

function ProductDetails() {
     const params = useParams();
     const slug = params?.slug;

     const [productDetails, setProductDetails] = useState({});
     const [productList, setProductList] = useState([]);
     const [hasError, setHasError] = useState(false);

     useEffect(() => {
          if (slug) {
               getProductBySlug_(slug);
          }
     }, [slug]);

     const getProductBySlug_ = async (productSlug) => {
          setHasError(false);

          try {
               const res = await ProductApis.getProductBySlug(productSlug);
               // The filtered collection endpoint returns an array.
               let product = res?.data?.data?.[0];

               // Support old documentId links and products whose slug is not filled yet.
               if (!product) {
                    const legacyRes = await ProductApis.getProductById(productSlug);
                    product = legacyRes?.data?.data;
               }

               if (!product) {
                    throw new Error("Product was not found");
               }

               setProductDetails(product);

               try {
                    const categoryRes = await ProductApis.getProductsByCategory(product.category);
                    setProductList(Array.isArray(categoryRes?.data?.data) ? categoryRes.data.data : []);
               } catch {
                    // Similar products are optional; keep the main product visible if they fail to load.
                    setProductList([]);
               }
          } catch {
               setHasError(true);
          }
     };

     if (hasError) {
          return (
               <div className="px-4 py-12 text-center sm:px-10 md:px-28" role="alert">
                    <h1 className="text-xl font-semibold">We couldn&apos;t load this product.</h1>
                    <p className="mt-2 text-sm text-gray-600">
                         Check the product slug and your connection, then try again.
                    </p>
                    <button
                         type="button"
                         onClick={() => slug && getProductBySlug_(slug)}
                         className="mt-4 rounded bg-gray-700 px-5 py-3 text-sm text-white transition hover:bg-gray-600"
                    >
                         Try again
                    </button>
               </div>
          );
     }

     return (
          <div className="px-4 py-8 sm:px-10 md:px-28">
               <BreadCrumb productTitle={productDetails?.title} />

               <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <ProductBanner product={productDetails} />
                    <ProductInfo product={productDetails} />
               </div>

               <div>
                    <h2 className="mb-4 mt-24 text-xl">Similar Products</h2>
                    <ProductList productList={productList} />
               </div>
          </div>
     );
}

export default ProductDetails;
