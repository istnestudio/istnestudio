import { cn } from "@/utils/cn";
import { cloneElement, ReactElement } from "react";

export const Centered = ({
  children,
}: {
  children: ReactElement<{ className?: string }>;
}) => {
  return cloneElement(children, {
    className: cn(children.props.className, "lg:w-[calc(33%-12px)]"),
  });
};
