import ProductItem from "./ProductItem";

function ProductList({ productList = [] }) {
    const products = Array.isArray(productList) ? productList : [];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {products.map((product) => (
                <ProductItem product={product} key={product.documentId || product.id} />
            ))}
        </div>
    );
}

export default ProductList;
