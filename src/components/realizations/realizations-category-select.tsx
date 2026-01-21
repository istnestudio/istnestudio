"use client";

import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { categories, useRealizations } from "./realizations-context";

type RealizationsCategorySelectProps = {
  className?: string;
};

export const RealizationsCategorySelect = ({
  className,
}: RealizationsCategorySelectProps) => {
  const { category, setCategory } = useRealizations();

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 rounded-2xl bg-gray-light p-2",
        className,
      )}
    >
      {categories.map((cat) => (
        <Button
          onClick={() => setCategory(cat)}
          key={cat}
          color={category === cat ? "black" : "gray"}
          className={cn("w-fit flex-1", {
            "hover:bg-foreground text-background! cursor-default":
              category === cat,
          })}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};
