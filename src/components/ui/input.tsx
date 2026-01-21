"use client";

import { cn } from "@/utils/cn";
import { HTMLProps, useId } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputProps<T extends FieldValues> = HTMLProps<HTMLInputElement> & {
  label?: string;
  register?: UseFormRegister<T>;
  name?: Path<T>;
  error?: FieldError;
};

export const Input = <T extends FieldValues>({
  className,
  label,
  register,
  error,
  name,
  ...props
}: InputProps<T>) => {
  const id = useId();
  return (
    <div className="relative">
      {error && (
        <p className="pointer-events-none absolute top-2 right-4 text-[0.65rem] text-error uppercase">
          {error.message}
        </p>
      )}
      <input
        id={id}
        {...(register && name ? register(name) : {})}
        {...props}
        placeholder=" "
        className={cn(
          "peer h-12 w-full rounded-xl border border-gray-dark bg-gray p-4 pt-7 text-xs leading-[120%] text-foreground uppercase",
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
            "pointer-events-none absolute top-4 left-4 -translate-y-1/2 text-[0.57rem] text-foreground/55 uppercase transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[0.65rem] peer-placeholder-shown:text-foreground peer-focus:top-4 peer-focus:text-[0.57rem] peer-focus:text-foreground/55",
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
