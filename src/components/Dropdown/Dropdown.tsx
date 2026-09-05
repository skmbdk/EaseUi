import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/libs/utils";
import { ChevronDown, Check, Search } from "lucide-react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  searchable = false,
  disabled = false,
  size = "md",
  position = "bottom-left",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState(value || "");

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Click outside listener to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP animation when menu opens/closes
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: position.startsWith("top") ? 8 : -8, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen, position]);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    setSearchQuery("");
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "top-full right-0 mt-1.5";
      case "top-left":
        return "bottom-full left-0 mb-1.5";
      case "top-right":
        return "bottom-full right-0 mb-1.5";
      case "bottom-left":
      default:
        return "top-full left-0 mt-1.5";
    }
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  return (
    <div ref={containerRef} className="flex flex-col gap-1 w-full relative">
      {label && (
        <label
          className={`text-sm font-medium transition-colors ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full rounded-md border flex items-center justify-between transition-all duration-150 outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm",
          sizeClasses,
          disabled
            ? isDark
              ? "bg-zinc-800 text-gray-500 border-zinc-700 cursor-not-allowed"
              : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : isDark
            ? "bg-zinc-900 text-gray-100 border-zinc-700 hover:border-zinc-600"
            : "bg-white text-gray-900 border-gray-300 hover:border-gray-400",
          className
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon}
          <span
            className={
              !selectedOption
                ? isDark
                  ? "text-gray-500"
                  : "text-gray-400"
                : ""
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "transition-transform duration-200 shrink-0",
            isOpen && "rotate-180",
            isDark ? "text-gray-400" : "text-gray-500"
          )}
        />
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute z-50 w-full min-w-[200px] rounded-lg border shadow-lg py-1 max-h-60 overflow-y-auto transition-colors",
            getPositionClasses(),
            isDark
              ? "bg-zinc-900 border-zinc-800 text-gray-100 shadow-black/40"
              : "bg-white border-gray-200 text-gray-900 shadow-gray-200/60"
          )}
        >
          {searchable && (
            <div
              className={`px-2 py-1.5 border-b sticky top-0 z-10 transition-colors ${
                isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`flex items-center px-2.5 py-1 rounded-md border transition-colors ${
                  isDark
                    ? "bg-zinc-800 border-zinc-700 text-gray-200"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              >
                <Search size={14} className="mr-1.5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search options..."
                  className="w-full bg-transparent text-xs outline-none"
                  autoFocus
                />
              </div>
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-xs text-center text-gray-400">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "px-3 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors mx-1 rounded-md",
                    option.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : isSelected
                      ? isDark
                        ? "bg-indigo-950/80 text-indigo-300 font-medium"
                        : "bg-indigo-50 text-indigo-700 font-medium"
                      : isDark
                      ? "hover:bg-zinc-800 text-gray-200"
                      : "hover:bg-gray-100 text-gray-800"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {option.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          isDark
                            ? "bg-zinc-800 text-indigo-400 border border-zinc-700"
                            : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        }`}
                      >
                        {option.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check
                        size={16}
                        className={isDark ? "text-indigo-400" : "text-indigo-600"}
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
