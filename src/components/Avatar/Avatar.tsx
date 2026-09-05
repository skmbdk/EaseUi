import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  name,
  size = "md",
  shape = "circle",
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  const getInitials = (nameStr?: string) => {
    if (!nameStr) return "?";
    const parts = nameStr.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  }[size];

  const statusSizeClasses = {
    xs: "w-1.5 h-1.5 bottom-0 right-0",
    sm: "w-2 h-2 bottom-0 right-0",
    md: "w-2.5 h-2.5 bottom-0 right-0 ring-2",
    lg: "w-3 h-3 bottom-0.5 right-0.5 ring-2",
    xl: "w-4 h-4 bottom-1 right-1 ring-2",
  }[size];

  const statusColorClasses = {
    online: "bg-emerald-500",
    offline: "bg-gray-400",
    busy: "bg-rose-500",
    away: "bg-amber-500",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center font-semibold overflow-hidden shrink-0 select-none border transition-colors",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        sizeClasses,
        isDark
          ? "bg-zinc-800 text-indigo-300 border-zinc-700"
          : "bg-indigo-50 text-indigo-700 border-indigo-200",
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={name || alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{getInitials(name || alt)}</span>
      )}

      {status && (
        <span
          className={cn(
            "absolute rounded-full shrink-0",
            statusSizeClasses,
            statusColorClasses[status],
            isDark ? "ring-zinc-950" : "ring-white"
          )}
        />
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  size = "md",
  className,
}) => {
  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;

  const visibleAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max && totalAvatars > max ? totalAvatars - max : 0;

  const sizeClasses = {
    xs: "w-6 h-6 text-[10px] -ml-1.5",
    sm: "w-8 h-8 text-xs -ml-2",
    md: "w-10 h-10 text-xs -ml-2.5",
    lg: "w-12 h-12 text-sm -ml-3",
    xl: "w-16 h-16 text-base -ml-4",
  }[size];

  return (
    <div className={cn("flex items-center pl-2", className)}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className={cn(
            "relative transition-transform hover:z-20 hover:scale-105",
            index > 0 && sizeClasses
          )}
        >
          {child}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            "relative flex items-center justify-center font-bold rounded-full border shrink-0 transition-colors",
            sizeClasses,
            isDark
              ? "bg-zinc-800 text-gray-200 border-zinc-700 ring-2 ring-zinc-950"
              : "bg-gray-100 text-gray-700 border-gray-300 ring-2 ring-white"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
