import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  width?: "w-full" | "w-fit";
}
const Button = (props: IButtonsProps) => {
  const { className, children, width = "w-full", ...rest } = props;
  return (
    <button
      className={`p-2 rounded-lg text-white ${width}  cursor-pointer
   ${className} 
`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
