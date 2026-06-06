import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <section
      className={cn("py-20 md:py-32 lg:py-40 relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </section>
  );
};
