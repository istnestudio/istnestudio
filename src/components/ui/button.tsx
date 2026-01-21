import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLProps, PropsWithChildren } from "react";
import { Icon, IconKey } from "./icons";

const buttonVariants = cva(
  "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-8 py-4 text-[0.65rem] tracking-[0.0625em] uppercase transition-colors",
  {
    variants: {
      color: {
        black:
          "border-foreground bg-foreground text-background enabled:hover:bg-gray-light enabled:hover:text-foreground",
        white:
          "border-foreground bg-background text-foreground enabled:hover:bg-foreground enabled:hover:text-background",
        gray: "border-gray bg-gray text-foreground hover:border-foreground enabled:hover:bg-foreground enabled:hover:text-background",
        success: "border-success bg-success text-foreground",
        error: "border-error bg-error text-foreground",
        pending: "border-button-pending bg-button-pending text-background",
      },
    },
  },
);

type ButtonProps = PropsWithChildren<
  VariantProps<typeof buttonVariants> &
    Omit<HTMLProps<HTMLButtonElement>, "color" | "children" | "type"> & {
      icon?: IconKey;
      iconPosition?: "left" | "right";
    }
>;

export const Button = ({
  children,
  color,
  className,
  icon,
  iconPosition,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ color }), className)} {...props}>
      {icon && iconPosition === "left" && <Icon icon={icon} />}
      {children}
      {icon && iconPosition === "right" && <Icon icon={icon} />}
    </button>
  );
};
