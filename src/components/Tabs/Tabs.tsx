import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/libs/utils";
import { useSelector } from "react-redux";
import gsap from "gsap";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
  variant?: "pills" | "underline" | "segmented";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTabId,
  onChange,
  variant = "pills",
  size = "md",
  className,
}) => {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || items[0]?.id || ""
  );

  const activeTabRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  const handleTabClick = (item: TabItem) => {
    if (item.disabled) return;
    setActiveTabId(item.id);
    onChange?.(item.id);
  };

  // GSAP transition when tab content changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [activeTabId]);

  const activeItem = items.find((item) => item.id === activeTabId) || items[0];

  const sizeClasses = {
    sm: "px-3 py-1 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  }[size];

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Tab Navigation List */}
      <div
        className={cn(
          "flex items-center gap-1 overflow-x-auto scrollbar-none",
          variant === "underline" &&
            `border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`,
          variant === "segmented" &&
            `p-1 rounded-lg border ${
              isDark
                ? "bg-zinc-900 border-zinc-800"
                : "bg-gray-100 border-gray-200"
            }`
        )}
      >
        {items.map((item) => {
          const isActive = item.id === activeTabId;
          return (
            <button
              key={item.id}
              ref={isActive ? activeTabRef : null}
              disabled={item.disabled}
              onClick={() => handleTabClick(item)}
              className={cn(
                "inline-flex items-center font-medium transition-all duration-200 outline-none whitespace-nowrap rounded-md cursor-pointer",
                sizeClasses,
                item.disabled && "opacity-50 cursor-not-allowed",
                // Pills variant
                variant === "pills" &&
                  (isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-gray-100 hover:bg-zinc-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"),
                // Underline variant
                variant === "underline" &&
                  (isActive
                    ? isDark
                      ? "text-indigo-400 border-b-2 border-indigo-400 rounded-none -mb-px font-semibold"
                      : "text-indigo-600 border-b-2 border-indigo-600 rounded-none -mb-px font-semibold"
                    : isDark
                    ? "text-gray-400 hover:text-gray-200 rounded-none"
                    : "text-gray-600 hover:text-gray-900 rounded-none"),
                // Segmented variant
                variant === "segmented" &&
                  (isActive
                    ? isDark
                      ? "bg-zinc-800 text-gray-100 shadow-sm font-semibold"
                      : "bg-white text-gray-900 shadow-sm font-semibold"
                    : isDark
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900")
              )}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={cn(
                    "ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                    isActive
                      ? variant === "pills"
                        ? "bg-white/20 text-white"
                        : isDark
                        ? "bg-indigo-950 text-indigo-300"
                        : "bg-indigo-100 text-indigo-700"
                      : isDark
                      ? "bg-zinc-800 text-gray-400"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content Container */}
      <div
        ref={contentRef}
        className={cn(
          "p-5 rounded-lg border transition-colors",
          isDark
            ? "bg-zinc-900/60 border-zinc-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        )}
      >
        {activeItem?.content}
      </div>
    </div>
  );
};
