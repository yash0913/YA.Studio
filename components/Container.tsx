import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
