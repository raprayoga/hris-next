import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import Card from "@/components/elements/Card";

const toastVariant = cva("pr-8 fixed z-50 bottom-2 left-1/2 w-4/5 fade-top", {
  variants: {
    theme: {
      danger: "bg-salmon text-primary",
      green: "bg-green text-white",
      white: "bg-white border border-gray text-gray",
    },
  },
  defaultVariants: {
    theme: "danger",
  },
});

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariant> {
  isShow: boolean;
  onCLosed?: () => void;
}

function Toast({
  className,
  theme = "danger",
  isShow = false,
  onCLosed = () => null,
  ...props
}: ToastProps) {
  return (
    isShow && (
      <Card className={cn(toastVariant({ theme }), className)} {...props}>
        {props.children}
        <XMarkIcon
          className="absolute top-1 right-2 w-5 cursor-pointer"
          onClick={() => onCLosed()}
        />
      </Card>
    )
  );
}

export { Toast };
