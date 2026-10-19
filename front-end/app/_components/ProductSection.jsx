"use client";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductApis from "../_utils/ProductApis";

function ProductSection() {
     const [productList, setProductList] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [hasError, setHasError] = useState(false);

     useEffect(() => {
          getLatestProducts_();
     }, []);

     const getLatestProducts_ = async () => {
          setIsLoading(true);
          setHasError(false);

          try {
               const res = await ProductApis.getLatestProducts();
               setProductList(Array.isArray(res?.data?.data) ? res.data.data : []);
          } catch {
               setHasError(true);
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div id="products" className="px-4 sm:px-6 md:px-10 lg:px-20">
               <div className="my-4">
                    <h2 className="text-lg font-bold sm:text-xl">Brand New</h2>
               </div>

               {isLoading && (
                    <p role="status" className="py-6 text-sm text-gray-500">
                         Loading products...
                    </p>
               )}

               {hasError && (
                    <div role="alert" className="py-6 text-sm text-gray-600">
                         <p>We couldn&apos;t load the products.</p>
                         <button
                              type="button"
                              onClick={getLatestProducts_}
                              className="mt-2 text-primary underline underline-offset-4"
                         >
                              Try again
                         </button>
                    </div>
               )}

               {!isLoading && !hasError && productList.length === 0 && (
                    <p className="py-6 text-sm text-gray-500">
                         No products are available right now.
                    </p>
               )}

               {!isLoading && !hasError && productList.length > 0 && (
                    <ProductList productList={productList} />
               )}
          </div>
     );
}

export default ProductSection;
