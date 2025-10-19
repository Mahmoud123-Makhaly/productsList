import type { InputHTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IInputProps) => {
  return (
    <input
      className="border-1 border-gray-300  shadow-md focus:border-indigo-700 focus:outline-none p-3  rounded-lg  text-md focus:ring-3 focus:ring-indigo-200  "
      {...rest}
    />
  );
};

export default Input;
