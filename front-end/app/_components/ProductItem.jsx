import Image from "next/image";
import { List } from "lucide-react";
import Link from "next/link";

function ProductItem({ product }) {
     // Use a readable slug when available; keep a working link during slug migration.
     const productUrl = product?.slug || product?.documentId;

     return (
          <Link
               href={`/product-details/${productUrl}`}
               className="
                    group block overflow-hidden rounded-xl
                    border border-gray-100
                    hover:border-teal-300
                    hover:shadow-md
                    transition-all duration-300 ease-in-out
               "
          >
               {product?.banner?.url ? (
                    <Image
                         src={product.banner.url}
                         alt={`${product?.title || "Product"} banner`}
                         width={400}
                         height={350}
                         className="h-40 w-full rounded-t-xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 sm:h-45 md:h-47.5"
                         unoptimized
                    />
               ) : (
                    <div className="flex h-40 w-full items-center justify-center rounded-t-xl bg-gray-100 text-sm text-gray-500 sm:h-45 md:h-47.5">
                         No image available
                    </div>
               )}

               <div className="flex items-center justify-between gap-2 p-3 rounded-b-lg bg-gray-70">
                    <div className="min-w-0">
                         <h2 className="text-[12px] sm:text-sm font-medium truncate">
                              {product?.title}
                         </h2>

                         <h2 className="text-[10px] sm:text-xs text-gray-400 flex gap-1 items-center mt-1">
                              <List className="w-4 h-4 shrink-0" />
                              <span className="truncate">{product?.category}</span>
                         </h2>
                    </div>

                    <h2 className="text-primary text-sm sm:text-base font-semibold shrink-0">
                         $ {product?.price}
                    </h2>
               </div>
          </Link>
     );
}

export default ProductItem;
