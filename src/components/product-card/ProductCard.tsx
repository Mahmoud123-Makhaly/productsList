import { Fragment } from "react/jsx-runtime";
import type { IProduct } from "../../interfaces";
import Button from "../ui/Button";
import Image from "../ui/Image";
import { textSlicer } from "../../utils/Functions";
import CircleColor from "../circle-color/CircleColor";
interface IProductCardProps {
  product: IProduct;
}
const ProductCard = (props: IProductCardProps) => {
  const {
    product: { title, description, imageURL, price, colors, category },
  } = props;
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
        <Button className="bg-indigo-700">Edit</Button>
        <Button className="bg-red-700 ">Delete</Button>
      </div>
    </div>
  );
};
export default ProductCard;
