import { Fragment } from "react/jsx-runtime";
import type { IProduct } from "../../interfaces";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { textSlicer } from "../../utils/Functions";
import CircleColor from "../circle-color/CircleColor";
 
interface IProductCardProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  index: number;
  setProductToEditIndex: (index: number) => void;
  setIsOpenDeleteModal: (val: boolean) => void;
  setProductToDelete: (product: IProduct) => void;
}
const ProductCard = (props: IProductCardProps) => {
  const {
    product,
    setProductToEdit,
    openEditModal,
    index,
    setProductToEditIndex,
    setIsOpenDeleteModal,
    setProductToDelete,
  } = props;
  const { title, description, imageURL, price, colors, category } = product;
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIndex(index);
  };
  return (
    <div className="border border-gray-300 p-3 rounded-md flex flex-col gap-3 mx-auto">
      <Image imageUrl={imageURL} alt={title} className="rounded-md " />
      <h3>{title}</h3>
      <p>{textSlicer(description)}</p>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <Fragment key={color}>
            <CircleColor color={color} />
          </Fragment>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-indigo-700">${price}.000</span>

        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-fill"
        />
      </div>
      <div className="flex gap-3  justify-between w-full">
        <Button className="bg-indigo-700" onClick={onEdit}>
          Edit
        </Button>
        <Button
          className="bg-red-700 "
          onClick={() => {
            setIsOpenDeleteModal(true);
            setProductToDelete(product);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
export default ProductCard;
