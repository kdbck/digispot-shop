import classNames from "classnames";
import { ReactNode } from "react";

const Section = ({ children, className }: { children: ReactNode; className: string }) => (
  <div
    className={classNames(
      "w-full max-w-5xl px-3 sm:px-6",
      className
    )}
  >
    {children}
  </div>
)

export default Section;
