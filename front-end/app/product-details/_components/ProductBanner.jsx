import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

function ProductBanner({ product }) {
    return (
        <div className="flex min-h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:min-h-80">
            {product?.banner?.url ? (
                <Image
                    src={product.banner.url}
                    alt={product?.banner?.alternativeText || `${product?.title || "Product"} image`}
                    width={700}
                    height={560}
                    className="h-auto max-h-120 w-full object-contain rounded-lg"
                    unoptimized
                />
            ) : (
                <div className="flex flex-col items-center gap-3 py-10 text-gray-400">
                    <ShoppingBag className="h-10 w-10" />
                    <span className="text-sm">Product image unavailable</span>
                </div>
            )}
        </div>
    );
}

export default ProductBanner;
