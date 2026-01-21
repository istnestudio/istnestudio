import { cn } from "@/utils/cn";
import { forwardRef, PropsWithChildren } from "react";

type CardsGridProps = PropsWithChildren<{
  className?: string;
}>;

export const CardsGrid = forwardRef<HTMLDivElement, CardsGridProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
