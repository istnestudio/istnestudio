import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren } from "react";

type H2Props = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;

export const H2 = ({ className, children, ...props }: H2Props) => (
  <h2
    className={cn(
      "font-pixel-demon text-[0.625rem] leading-3.75 tracking-[0.0625rem] uppercase",
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);
