import ProductCard from "./components/product-card/ProductCard";
import { productList } from "./data/data";
import type { IProduct } from "./interfaces";

const App = () => {
  return (
    <main>
      <div className="m-5 container mx-auto   p-4 rounded-lg grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 ">
        {/* Render ProductList */}
        {productList.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};
export default App;
