import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/product-card/ProductCard";
import Modal from "./components/ui/Modal";
import { colors, formInputsList, productList } from "./data/data";
import type { IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { productValidation } from "./validation";
import ErrorMessage from "./components/error-message/ErrorMessage";
import CircleColor from "./components/circle-color/CircleColor";

const App = () => {
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Partial<IProduct>>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageURL: "" },
  });
  const [error, setError] = useState<Partial<IProduct>>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  console.log(tempColors);
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const resetForm = () => {
    setProduct({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: [],
      category: { name: "", imageURL: "" },
    });
  };
  const onCancel = () => {
    close();
    resetForm();
    setError({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    });

    const validEnteredValues =
      Object.values(error).every((val) => val === "") &&
      Object.values(product).every((val) => val !== "");
    if (validEnteredValues) {
      const newProduct: Partial<IProduct> = {
        ...product,
        id: crypto.randomUUID(),
        colors: tempColors,
        category: { name: "category name", imageURL: "" },
      };
      setProducts((prev) => [...prev, newProduct as IProduct]);
      close();
      resetForm();
      setTempColors([]);
    } else {
      setError(error);
    }
  };
  const handleAddColor = (color: string) => {
    setTempColors((prev) =>
      prev.includes(color)
        ? prev.filter((color) => color !== color)
        : [...prev, color]
    );
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

          {products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Modal isOpen={isOpen} close={close} title="Add Product">
          <div className="flex flex-col space-y-3">
            <form onSubmit={handleFormSubmit}>
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

                  <ErrorMessage message={error[input.name]} />
                </div>
              ))}
              <div className="flex items-center gap-2 flex-wrap my-3">
                {" "}
                {tempColors.map((color) => (
                  <span
                    key={color}
                    className="text-white py-1 px-2 rounded"
                    style={{ background: color }}
                  >
                    {color}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap my-3">
                {colors.map((color) => (
                  <CircleColor
                    key={color}
                    color={color}
                    onClick={() => handleAddColor(color)}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-3">
                <Button className="bg-indigo-700 hover:bg-indigo-800">
                  Submit
                </Button>
                <Button
                  className="bg-gray-300 hover:bg-gray-400"
                  onClick={onCancel}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </main>
  );
};
export default App;
