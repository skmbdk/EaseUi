import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";
import { X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-full transition-colors whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "px-2 py-0.5 text-[11px] gap-1",
        md: "px-2.5 py-1 text-xs gap-1.5",
        lg: "px-3 py-1.5 text-sm gap-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "outline"
    | "glow";
  dot?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  dot = false,
  onRemove,
  children,
  className,
  ...props
}) => {
  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return isDark
          ? "bg-zinc-800 text-gray-200 border border-zinc-700"
          : "bg-gray-100 text-gray-800 border border-gray-200";
      case "success":
        return isDark
          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
          : "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "warning":
        return isDark
          ? "bg-amber-950/80 text-amber-300 border border-amber-800"
          : "bg-amber-50 text-amber-700 border border-amber-200";
      case "danger":
        return isDark
          ? "bg-rose-950/80 text-rose-300 border border-rose-800"
          : "bg-rose-50 text-rose-700 border border-rose-200";
      case "info":
        return isDark
          ? "bg-sky-950/80 text-sky-300 border border-sky-800"
          : "bg-sky-50 text-sky-700 border border-sky-200";
      case "outline":
        return isDark
          ? "bg-transparent text-gray-200 border border-zinc-700"
          : "bg-transparent text-gray-800 border border-gray-300";
      case "glow":
        return isDark
          ? "bg-indigo-950 text-indigo-300 border border-indigo-700 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
          : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.2)]";
      case "default":
      default:
        return isDark
          ? "bg-indigo-950/80 text-indigo-300 border border-indigo-800"
          : "bg-indigo-50 text-indigo-700 border border-indigo-200";
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case "success":
        return "bg-emerald-500";
      case "warning":
        return "bg-amber-500";
      case "danger":
        return "bg-rose-500";
      case "info":
        return "bg-sky-500";
      default:
        return "bg-indigo-500";
    }
  };

  return (
    <span
      className={cn(badgeVariants({ size }), getVariantStyles(), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", getDotColor())}
        />
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-75 focus:outline-none ml-0.5 rounded-full p-0.5"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};
