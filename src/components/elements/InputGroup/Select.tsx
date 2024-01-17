import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

export const inputVariant = cva(
  "h-full w-full border rounded outline-0 focus:shadow-md py-2 placeholder:text-gray text-black px-2",
  {
    variants: {
      theme: {
        default: "border-gray focus:shadow-gray",
        primary: "border-primary focus:shadow-primary",
        green: "border-green focus:shadow-green",
      },
    },
    defaultVariants: {
      theme: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof inputVariant> {
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ className, theme, children, ...props }, ref) => {
    return (
      <select
        className={cn(inputVariant({ theme }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
