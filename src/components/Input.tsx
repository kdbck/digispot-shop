import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
}
  
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  className,
  required,
  type,
  id,
  ...props
}, ref) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(props.checked ?? false);

  return (
    <div className={classNames("flex flex-col items-start", className)}>
      {label && type !== "checkbox" && (
        <label
          className="text-sm mb-0.5"
          htmlFor={id}
        >
          {label}{required && <span className='text-red-600'>*</span>}
        </label>
      )}
      {type === "checkbox" && (
        <>
          <input
            {...props}
            className="hidden"
            ref={ref}
            required={required}
            type={type}
            id={id}
            checked={isCheckboxChecked}
            onChange={(e) => {
              setIsCheckboxChecked(e.target.checked);
              props.onChange?.(e);
            }}
          />
          <label
            className="flex items-center gap-2"
            htmlFor={id}
          >
            <span
              className="border border-neutral-150 rounded-md w-6 h-6 flex items-center justify-center"
            >
              {isCheckboxChecked && (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13.5L9 17.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className="text-sm"
            >
              {label}
            </span>
          </label>
        </>
      )}
      {type !== "checkbox" && (
        <input
          className="border border-neutral-150 rounded-lg text-sm px-4 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          ref={ref}
          required={required}
          type={type}
          id={id}
          {...props}
        />
      )}
    </div>
  );
})

Input.displayName = "Input";

export default Input;
