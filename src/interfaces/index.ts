export interface IProduct {
  id?: string | undefined;
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
  name: string;
  label: string;
  type: string;
}
export interface ICategories {
  id: string;
  name: string;
  imageURL: string;
}
