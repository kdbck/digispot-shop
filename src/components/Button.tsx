import classNames from "classnames";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
  <button
    className={classNames(
      "bg-blue-700 text-white px-4 py-2 rounded-xl hover:opacity-75 active:opacity-50 duration-150",
      className
    )}
    {...props}
  >
    {children}
  </button>
)

export default Button;
