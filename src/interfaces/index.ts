import type { ProductNamesType } from "../types";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IFormInputsList {
  id: string;
  name: ProductNamesType;
  label: string;
  type: string;
}
export interface ICategories {
  id: string;
  name: string;
  imageURL: string;
}
