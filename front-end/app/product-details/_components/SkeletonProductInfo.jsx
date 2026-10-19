import React from "react";

function SkeletonProductInfo() {
    return (
        <div role="status" className="flex flex-col gap-5" aria-label="Loading product information">
            <span className="sr-only">Loading product information</span>
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
            <div className="h-16 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
            <div className="h-8 w-1/4 animate-pulse rounded bg-gray-100" />
            <div className="h-11 w-40 animate-pulse rounded-lg bg-gray-100" />
        </div>
    );
}

export default SkeletonProductInfo;
