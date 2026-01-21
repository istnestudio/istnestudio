import { cn } from "@/utils/cn";
import { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{ className?: string }>;

export const Container = ({ children, className }: ContainerProps) => (
  <div
    className={cn("flex w-full flex-col items-center text-center", className)}
  >
    {children}
  </div>
);
