import { useState, type ChangeEvent } from "react";
import ProductCard from "./components/product-card/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data/data";
import type { IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Partial<IProduct>>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  return (
    <main className="p-3">
      <div className="container mx-auto">
        <div className="flex   justify-between mb-3 ">
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
          <div className="flex flex-col space-y-3">
            <form>
              {formInputsList.map((input) => (
                <div key={input.id} className="flex flex-col gap-1 mb-3">
                  <label htmlFor={input.id}>{input.label}</label>
                  <Input
                    type="text"
                    id={input.id}
                    name={input.name}
                    value={product[input.name]}
                    onChange={onChangeHandler}
                  />
                </div>
              ))}
            </form>
            <div className="flex items-center space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Submit
              </Button>
              <Button className="bg-gray-300 hover:bg-gray-400" onClick={close}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
};
export default App;
