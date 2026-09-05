import React from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";

type NumberProps = Omit<InputProps, "type" | "onChange"> & {
  onChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberProps>(
  ({ onChange, step = 1, min, max, ...props }, ref) => {
    const themeState = useSelector(
      (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
    );
    const isDark = themeState?.mode === "dark";

    const handleInc = () => {
      const cur = Number((ref as any)?.current?.value || props.value || 0);
      const next = cur + step;
      if (max !== undefined && next > max) return;
      onChange?.(next);
    };
    const handleDec = () => {
      const cur = Number((ref as any)?.current?.value || props.value || 0);
      const next = cur - step;
      if (min !== undefined && next < min) return;
      onChange?.(next);
    };

    return (
      <div className="flex items-stretch gap-2 w-full">
        <div className="flex-1">
          <Input {...(props as any)} ref={ref} type="number" />
        </div>
        <div className={cn("flex flex-col gap-1", props.label ? "pt-6" : "")}>
          <button
            type="button"
            onClick={handleInc}
            className={`px-3 py-1 rounded transition-colors text-sm font-bold border ${
              isDark
                ? "bg-zinc-800 hover:bg-zinc-700 text-gray-200 border-zinc-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
            }`}
          >
            +
          </button>
          <button
            type="button"
            onClick={handleDec}
            className={`px-3 py-1 rounded transition-colors text-sm font-bold border ${
              isDark
                ? "bg-zinc-800 hover:bg-zinc-700 text-gray-200 border-zinc-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
            }`}
          >
            −
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
