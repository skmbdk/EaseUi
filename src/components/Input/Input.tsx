import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";

const inputVariants = cva(
  "w-full rounded-md focus:outline-none border shadow-sm transition-all duration-150 placeholder:text-gray-400",
  {
    variants: {
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      tone: {
        default:
          "focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400",
        error:
          "border-red-400 focus:ring-2 focus:ring-red-400 focus:border-red-400",
        success:
          "border-green-400 focus:ring-2 focus:ring-green-400 focus:border-green-400",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "disabled">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      className,
      size = "md",
      tone,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId =
      id ||
      React.useId?.() ||
      `input-${Math.random().toString(36).slice(2, 9)}`;

    const themeState = useSelector(
      (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
    );
    const isDark = themeState?.mode === "dark";

    const themeClasses = disabled
      ? isDark
        ? "bg-zinc-800 text-gray-500 border-zinc-700 cursor-not-allowed opacity-80"
        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-80"
      : isDark
      ? "bg-zinc-900 text-gray-100 border-zinc-700 placeholder:text-gray-500 hover:border-zinc-600"
      : "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 hover:border-gray-400";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(inputVariants({ size, tone }), themeClasses, className)}
          disabled={disabled ?? undefined}
          {...props}
        />
        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : hint ? (
          <p
            className={`text-sm transition-colors ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input, inputVariants };
