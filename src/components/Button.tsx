import classNames from "classnames";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'error'
  isLoading?: boolean
}

const Button = ({
  className,
  children,
  variant = 'primary',
  isLoading,
  ...props
}: ButtonProps) => (
  <button
    className={classNames(
      "hover:opacity-75 active:opacity-50 duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
      variant === "primary" && "bg-blue-700 text-white px-4 py-2 rounded-xl",
      variant === "error" && "bg-red-700 text-white px-4 py-2 rounded-xl",
      isLoading && "opacity-50 cursor-not-allowed",
      className
    )}
    {...props}
  >
    {children}
  </button>
)

export default Button;
