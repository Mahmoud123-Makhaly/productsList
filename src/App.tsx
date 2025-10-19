import { useState } from "react";
import ProductCard from "./components/product-card/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data/data";
import type { IProduct } from "./interfaces";
import Button from "./components/ui/Button";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <main className="p-3">
      <div className="container mx-auto">
        <div className="flex   justify-between mb-4 ">
          <h3 className="flex-1"> Product List </h3>
          <Button
            width="w-fit"
            className="bg-indigo-700 hover:bg-indigo-800 px-4"
            onClick={open}
          >
            Add Product
          </Button>
        </div>
        <div className="     rounded-lg grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 ">
          {/* Render ProductList */}

          {productList.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Modal isOpen={isOpen} close={close} title="Add Product">
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button className="bg-gray-300 hover:bg-gray-400" onClick={close}>
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    </main>
  );
};
export default App;
