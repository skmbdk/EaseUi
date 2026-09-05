import React from "react";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, size = "md", className, ...props }, ref) => {
    const themeState = useSelector(
      (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
    );
    const isDark = themeState?.mode === "dark";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-md border px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400 transition",
            isDark
              ? "bg-zinc-900 border-zinc-700 text-gray-100 placeholder:text-gray-500"
              : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400",
            size === "sm" && "text-sm",
            size === "lg" && "text-lg",
            size === "md" && "text-base",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
