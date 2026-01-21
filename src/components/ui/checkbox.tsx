import { cn } from "@/utils/cn";
import { HTMLProps } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputProps<T extends FieldValues> = HTMLProps<HTMLInputElement> & {
  register?: UseFormRegister<T>;
  name?: Path<T>;
  error?: FieldError;
};

export const Checkbox = <T extends FieldValues>({
  className,
  register,
  error,
  name,
  ...props
}: InputProps<T>) => (
  <div className="relative flex items-center justify-center">
    <input
      type="checkbox"
      {...(register && name ? register(name) : {})}
      {...props}
      className={cn(
        "peer grid h-4 w-4 cursor-pointer appearance-none place-content-center rounded-sm border border-gray-dark checked:bg-foreground",
        {
          "border-3 border-red-400": error,
        },
        className,
      )}
    />
    <div className="pointer-events-none absolute text-xs opacity-0 peer-checked:text-background peer-checked:opacity-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="h-3 w-3"
      >
        <path
          fill="currentColor"
          d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
        />
      </svg>
    </div>
  </div>
);
