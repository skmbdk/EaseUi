import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";

export interface FloatingLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelProps
>(({ label, size = "md", className, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";
  const filled = !!(props.value ?? props.defaultValue);
  const shrink = focused || filled;

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "w-full bg-transparent border-b pb-2 pt-6 focus:outline-none transition-all placeholder:text-transparent",
          isDark
            ? "border-zinc-700 text-gray-100 focus:border-indigo-400"
            : "border-gray-400 text-gray-900 focus:border-indigo-600",
          size === "sm" && "text-sm",
          size === "lg" && "text-lg",
          size === "md" && "text-base",
          className
        )}
      />
      <label
        className={cn(
          "absolute left-0 top-2 origin-left pointer-events-none transform transition-all",
          isDark ? "text-gray-400" : "text-gray-500",
          shrink ? "-translate-y-4 scale-75" : "translate-y-0 scale-100"
        )}
      >
        {label}
      </label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";
