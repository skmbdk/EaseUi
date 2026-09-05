import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";
import gsap from "gsap";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  description,
  checkedIcon,
  uncheckedIcon,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(
    checked !== undefined ? checked : defaultChecked
  );

  const thumbRef = useRef<HTMLSpanElement>(null);

  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  // GSAP thumb slide animation
  useEffect(() => {
    if (thumbRef.current) {
      const xOffset = {
        sm: isChecked ? 16 : 0,
        md: isChecked ? 20 : 0,
        lg: isChecked ? 24 : 0,
      }[size];

      gsap.to(thumbRef.current, {
        x: xOffset,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isChecked, size]);

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !isChecked;
    setIsChecked(nextState);
    onChange?.(nextState);
  };

  const trackDimensions = {
    sm: "w-8 h-4.5 p-0.5",
    md: "w-11 h-6 p-0.5",
    lg: "w-14 h-7.5 p-1",
  }[size];

  const thumbDimensions = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-5.5 h-5.5",
  }[size];

  return (
    <label
      onClick={handleToggle}
      className={cn(
        "inline-flex items-start gap-3 select-none cursor-pointer group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",
          isDark ? "focus:ring-offset-zinc-950" : "focus:ring-offset-white",
          trackDimensions,
          isChecked
            ? "bg-indigo-600"
            : isDark
            ? "bg-zinc-800 border border-zinc-700"
            : "bg-gray-300"
        )}
      >
        <span
          ref={thumbRef}
          className={cn(
            "pointer-events-none flex items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 text-gray-700",
            thumbDimensions
          )}
        >
          {isChecked ? checkedIcon : uncheckedIcon}
        </span>
      </button>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                isDark ? "text-gray-200" : "text-gray-900"
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-xs leading-relaxed transition-colors",
                isDark ? "text-gray-400" : "text-gray-500"
              )}
            >
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
