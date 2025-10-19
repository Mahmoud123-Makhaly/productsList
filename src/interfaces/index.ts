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
type formFields = "title" | "description" | "imageURL" | "price";
export interface IFormInputsList {
  id: string;
  name: formFields;
  label: string;
  type: string;
}
export interface ICategories {
  id: string;
  name: string;
  imageURL: string;
}
