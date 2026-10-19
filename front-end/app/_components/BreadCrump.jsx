import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

function BreadCrump({ productTitle }) {
    return (
        <nav aria-label="Breadcrumb" className="w-full">
            <ol className="flex max-w-full items-center gap-2 overflow-hidden rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
                <li className="flex shrink-0 items-center">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 transition hover:text-primary">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                    </Link>
                </li>
                <li aria-hidden="true"><ChevronRight className="h-4 w-4 text-gray-400" /></li>
                <li className="shrink-0"><Link href="/#products" className="text-gray-600 transition hover:text-primary">Products</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-4 w-4 text-gray-400" /></li>
                <li aria-current="page" className="min-w-0 truncate font-medium text-gray-900" title={productTitle || "Product details"}>
                    {productTitle || "Product details"}
                </li>
            </ol>
        </nav>
    );
}

export default BreadCrump;
