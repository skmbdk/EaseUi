import React from "react";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: "pulse" | "wave" | "none";
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  lines = 1,
  animation = "wave",
  className,
  style,
  ...props
}) => {
  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  const getBaseClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full shrink-0";
      case "rectangular":
        return "rounded-md";
      case "card":
        return "rounded-xl border p-4 space-y-3";
      case "text":
      default:
        return "rounded h-4 w-full";
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case "pulse":
        return "animate-pulse";
      case "wave":
        return "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent";
      case "none":
      default:
        return "";
    }
  };

  const themeBgClasses = isDark ? "bg-zinc-800" : "bg-gray-200";

  // Card Skeleton Preset
  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-xl border p-4 space-y-4 transition-colors",
          isDark
            ? "bg-zinc-900/60 border-zinc-800"
            : "bg-white border-gray-200 shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full shrink-0",
              themeBgClasses,
              getAnimationClasses()
            )}
          />
          <div className="space-y-2 flex-1">
            <div
              className={cn(
                "h-3.5 w-3/4 rounded",
                themeBgClasses,
                getAnimationClasses()
              )}
            />
            <div
              className={cn(
                "h-2.5 w-1/2 rounded",
                themeBgClasses,
                getAnimationClasses()
              )}
            />
          </div>
        </div>
        <div
          className={cn(
            "h-32 w-full rounded-lg",
            themeBgClasses,
            getAnimationClasses()
          )}
        />
        <div className="space-y-2 pt-1">
          <div
            className={cn(
              "h-3 w-full rounded",
              themeBgClasses,
              getAnimationClasses()
            )}
          />
          <div
            className={cn(
              "h-3 w-4/5 rounded",
              themeBgClasses,
              getAnimationClasses()
            )}
          />
        </div>
      </div>
    );
  }

  // Multi-line Text Skeleton
  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2.5 w-full">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              getBaseClasses(),
              themeBgClasses,
              getAnimationClasses(),
              idx === lines - 1 && lines > 1 && "w-3/4",
              className
            )}
            style={{
              width: idx === lines - 1 ? undefined : width,
              height,
              ...style,
            }}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        getBaseClasses(),
        themeBgClasses,
        getAnimationClasses(),
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};
