import { cn } from "@/utils/cn";
import { HTMLAttributes, PropsWithChildren } from "react";

type ParagraphProps = PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>;

export const P = ({ className, children, ...props }: ParagraphProps) => (
  <p className={cn("font-schrifted text-xs leading-6", className)} {...props}>
    {children}
  </p>
);
