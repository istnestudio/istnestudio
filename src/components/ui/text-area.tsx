"use client";

import { cn } from "@/utils/cn";
import { HTMLProps, useId } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TextAreaProps<T extends FieldValues> = HTMLProps<HTMLTextAreaElement> & {
  label?: string;
  register?: UseFormRegister<T>;
  name?: Path<T>;
  error?: FieldError;
};

export const TextArea = <T extends FieldValues>({
  className,
  label,
  register,
  name,
  error,
  ...props
}: TextAreaProps<T>) => {
  const id = useId();
  return (
    <div className="relative">
      {error && (
        <p className="pointer-events-none absolute top-2 right-4 z-10 text-[0.65rem] text-error uppercase">
          {error.message}
        </p>
      )}
      <textarea
        id={id}
        {...(register && name ? register(name) : {})}
        {...props}
        placeholder=" "
        className={cn(
          "peer h-39 w-full rounded-xl border border-gray-dark bg-gray p-4 pt-7 text-xs leading-[120%] text-foreground uppercase",
          {
            "border-2 border-red-400": error,
          },
          className,
        )}
      />
      {label && (
        <label
          htmlFor={props.id ?? id}
          className={cn(
            "pointer-events-none absolute top-0.5 left-0.5 w-[calc(100%-4px)] rounded-2xl bg-gray py-2 pl-4 text-left text-[0.57rem] text-foreground/55 uppercase",
            {
              "text-error!": error,
            },
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};
