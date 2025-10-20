import type { HTMLAttributes } from "react";

interface ICircleColorProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }: ICircleColorProps) => {
  return (
    <span
      className="w-5 block h-5 cursor-pointer rounded-full"
      style={{ background: color }}
      {...rest}
    ></span>
  );
};
export default CircleColor;
