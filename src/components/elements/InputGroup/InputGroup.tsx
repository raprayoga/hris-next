import * as React from "react";
import { cn } from "@/utils";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative flex justify-center items-center p-0 overflow-hidden text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputGroup.displayName = "InputGroup";

export { InputGroup };
