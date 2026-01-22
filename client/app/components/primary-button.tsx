import React from "react";
import { Button } from "./ui/button";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {

  /** You can extend this interface with custom props if needed */
};

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className = "", children, ...props }, ref) => (
    <Button
      ref={ref}
      type={props.type || "button"}
      className={
        `px-4 py-2 rounded-lg bg-linear-to-br from-blue-500 via-cyan-400 to-indigo-500 text-white font-semibold shadow-sm hover:opacity-75 hover:cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  ${className}`.trim()
      }
      {...props}
    >
      {children}
    </Button>
  )
);