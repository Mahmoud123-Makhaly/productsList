import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/product-card/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data/data";
import type { IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { productValidation } from "./validation";
import ErrorMessage from "./components/error-message/ErrorMessage";
import CircleColor from "./components/circle-color/CircleColor";
import Select from "./components/ui/Select";
import type { ProductNamesType } from "./types";
import toast, { Toaster } from "react-hot-toast";
const defaultProduct = {
  id: "",
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: { name: "", imageURL: "" },
};
const App = () => {
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [product, setProduct] = useState<Partial<IProduct>>(defaultProduct);
  const [error, setError] = useState<{
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
  }>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    imageURL: string;
  }>(categories[0]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [productToEditIndex, setProductToEditIndex] = useState(0);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<IProduct>(defaultProduct);
  const openAddModal = () => {
    setIsOpenAddModal(true);
  };

  const closeAddModal = () => {
    setIsOpenAddModal(false);
  };
  const openEditModal = () => {
    setIsOpenEditModal(true);
  };

  const closeEditModal = () => {
    setIsOpenEditModal(false);
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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit((prev) => ({
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
    setTempColors([]);
  };
  /**
   * Resets the form and error state, then closes the modal
   */
  const onCancel = () => {
    setError({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
    closeAddModal();
    resetForm();
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      colors: tempColors,
    });

    const validEnteredValues =
      Object.values(error).every((val) => val === "") &&
      Object.values(product).every((val) => val !== "");
    if (validEnteredValues) {
      const newProduct: Partial<IProduct> = {
        ...product,
        id: crypto.randomUUID(),
        colors: tempColors,
        category: selectedCategory,
      };
      setProducts((prev) => [...prev, newProduct as IProduct]);
      close();
      resetForm();
      setTempColors([]);
    } else {
      setError(error);
    }
  };
  const handleFormSubmitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
      // colors: tempColors,
    });

    const validEnteredValues =
      Object.values(error).every((val) => val === "") &&
      Object.values(productToEdit).every((val) => val !== "");
    if (validEnteredValues) {
      const updatedProducts = [...products];
      updatedProducts[productToEditIndex] = {
        ...productToEdit,
        colors: tempColors.concat(productToEdit.colors),
      };
      setProducts(updatedProducts);
      closeEditModal();
      resetForm();
      setTempColors([]);
    } else {
      setError(error);
    }
  };
  const handleAddColor = (color: string) => {
    // For both add and edit modes
    if (tempColors.includes(color)) {
      setTempColors((prev) => prev.filter((c) => c !== color));
    } else {
      setTempColors((prev) => [...prev, color]);
    }

    setError((prev) => ({
      ...prev,
      colors: "",
    }));
  };

  /*******  af1149a8-817b-4edd-92b4-fb4cefc46df8  *******/ const renderEditProductFieldWithError =
    (id: string, label: string, name: ProductNamesType) => {
      return (
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor={id}>{label}</label>
          <Input
            type="text"
            id={id}
            name={name}
            value={productToEdit[name]}
            onChange={onChangeEditHandler}
          />

          <ErrorMessage message={error[name]} />
        </div>
      );
    };
  const handleDeleteProduct = () => {
    // setProducts((prev) => prev.filter((product) => product.id !== id));
    setProducts((prev) =>
      prev.filter((product) => product.id !== productToDelete.id)
    );
    setIsOpenDeleteModal(false);
    toast.success(" Product Deleted Successfully  !", {
      icon: "🚀",
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
            onClick={openAddModal}
          >
            Add Product
          </Button>
        </div>
        <div className="     rounded-lg grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 ">
          {/* Render ProductList */}

          {products.map((product: IProduct, index: number) => (
            <ProductCard
              key={product.id}
              product={product}
              setProductToEdit={setProductToEdit}
              openEditModal={openEditModal}
              index={index}
              setProductToEditIndex={setProductToEditIndex}
              setIsOpenDeleteModal={setIsOpenDeleteModal}
              setProductToDelete={setProductToDelete}
            />
          ))}
        </div>
        {/* Add Product Modal */}
        <Modal
          isOpen={isOpenAddModal}
          close={closeAddModal}
          title="Add Product"
        >
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
                <Select
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap my-3">
                {colors.map((color) => (
                  <CircleColor
                    key={color}
                    color={color}
                    onClick={() => handleAddColor(color)}
                  />
                ))}
                <ErrorMessage message={error.colors} />
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
        {/* Edit Product Modal */}
        <Modal
          isOpen={isOpenEditModal}
          close={closeEditModal}
          title="Edit Product"
        >
          <div className="flex flex-col space-y-3">
            <form onSubmit={handleFormSubmitEditHandler}>
              {renderEditProductFieldWithError(
                "title",
                "Product Title",
                "title"
              )}
              {renderEditProductFieldWithError(
                "description",
                "Product Description",
                "description"
              )}
              {renderEditProductFieldWithError(
                "imageURL",
                "Product ImageURL",
                "imageURL"
              )}
              {renderEditProductFieldWithError(
                "price",
                "Product price",
                "price"
              )}
              <div className="flex items-center gap-2 flex-wrap my-3">
                {colors.map((color) => (
                  <CircleColor
                    key={color}
                    color={color}
                    onClick={() => handleAddColor(color)}
                  />
                ))}
                <ErrorMessage message={error.colors} />
              </div>
              <div className="flex items-center gap-2 flex-wrap my-3">
                {" "}
                {tempColors.concat(productToEdit.colors).map((color) => (
                  <span
                    key={color}
                    className="text-white py-1 px-2 rounded"
                    style={{ background: color }}
                  >
                    {color}
                  </span>
                ))}
                <Select
                  selectedCategory={productToEdit.category}
                  setSelectedCategory={(value) => {
                    setProductToEdit({ ...productToEdit, category: value });
                  }}
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button className="bg-indigo-700 hover:bg-indigo-800">
                  Submit
                </Button>
                <Button
                  className="bg-gray-300 hover:bg-gray-400"
                  type="button"
                  onClick={() => {
                    closeEditModal();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        {/* delete modal */}
        <Modal
          isOpen={isOpenDeleteModal}
          close={() => setIsOpenDeleteModal(false)}
          title="Delete Product"
        >
          <div className="flex flex-col space-y-3">
            <form onSubmit={handleFormSubmitEditHandler}>
              <h2 className="mb-3 text-red-700">
                Are you sure you want to delete this product
              </h2>
              <div className="flex items-center space-x-3">
                <Button
                  className="bg-red-700 hover:bg-red-800"
                  onClick={handleDeleteProduct}
                >
                  Submit
                </Button>
                <Button
                  className="bg-gray-300 hover:bg-gray-400"
                  type="button"
                  onClick={() => {
                    setIsOpenDeleteModal(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </main>
  );
};
export default App;
