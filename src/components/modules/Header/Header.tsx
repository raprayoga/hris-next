import React from "react";
import { cn } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLHeadElement>
>(({ className, ...props }, ref) => {
  const router = useRouter();

  return (
    <header
      ref={ref}
      className={cn(
        "fixed top-0 z-10 flex h-16 w-4/5 items-center bg-white py-2 border-b border-gray-1",
        className
      )}
      {...props}
    >
      <div className="max-w-[1280px] w-full mx-auto flex justify-between px-12">
        <Link href="/" className="flex items-center">
          <h1 className="ml-1 text-xl font-bold">HRIS APP</h1>
        </Link>
        <div className="flex gap-5 font-medium">
          <Link
            href="/account"
            className={
              router.pathname === "/account" ||
              router.pathname === "/account/edit"
                ? "text-primary font-bold"
                : ""
            }
          >
            Akun
          </Link>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export { Header };
