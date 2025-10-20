// I want errors object is match with this  product object

import type { IProduct } from "../interfaces";

export const productValidation = (product: Partial<IProduct>) => {
  const errors: Partial<IProduct> = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  if (
    !product.title?.trim() ||
    product.title.length < 3 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 3 and 80 characters";
  }
  if (
    !product.description?.trim() ||
    product.description.length < 3 ||
    product.description.length > 200
  ) {
    errors.description =
      "Product description must be between 3 and 400 characters";
  }
  const imageUrlMatch =
    /^https?:\/\/.+(\.(png|gif|webp|jpeg|jpg))?(\?.*)?$/i.test(
      product.imageURL!
    );
  if (!product.imageURL?.trim() || !imageUrlMatch) {
    errors.imageURL = "Invalid image URL";
  }
  if (Number(product.price) < 0 || isNaN(Number(product.price))) {
    errors.price = "Invalid price";
  }
  return errors;
};
