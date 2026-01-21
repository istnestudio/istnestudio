import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren } from "react";

type H1Props = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;

export const H1 = ({ className, children, ...props }: H1Props) => (
  <h1
    className={cn(
      "font-pixel-demon text-xl leading-7.5 tracking-[0.0625rem] uppercase",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
);
