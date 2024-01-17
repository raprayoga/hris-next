import React from "react";
import { cn } from "@/utils";

export interface DalogProps extends React.HTMLAttributes<HTMLDivElement> {
  isShow: boolean;
  className?: string;
  onClose?: () => void;
}

const Dialog = React.forwardRef<HTMLDivElement, DalogProps>(
  ({ className, isShow, onClose = () => null, ...props }, ref) =>
    isShow && (
      <>
        <div
          ref={ref}
          className="fixed inset-0 z-50 bg-black opacity-40"
          onClick={onClose}
        />
        <div
          className={cn(
            "fixed bg-white left-[50%] top-[50%] z-50 max-w-full p-6 shadow-lg rounded-lg fade-in",
            className
          )}
          {...props}
        />
      </>
    )
);
Dialog.displayName = "Dialog";

export { Dialog };
