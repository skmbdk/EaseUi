import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/libs/utils";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  variant?: "bordered" | "separated" | "ghost";
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  variant = "bordered",
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  const toggleItem = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div
      className={cn(
        "w-full space-y-2",
        variant === "bordered" &&
          `rounded-lg border overflow-hidden ${
            isDark ? "border-zinc-800 bg-zinc-900/40" : "border-gray-200 bg-white"
          }`,
        className
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);

        return (
          <AccordionRow
            key={item.id}
            item={item}
            isOpen={isOpen}
            isDark={isDark}
            variant={variant}
            isLast={index === items.length - 1}
            onToggle={() => toggleItem(item.id, item.disabled)}
          />
        );
      })}
    </div>
  );
};

interface AccordionRowProps {
  item: AccordionItem;
  isOpen: boolean;
  isDark: boolean;
  variant: "bordered" | "separated" | "ghost";
  isLast: boolean;
  onToggle: () => void;
}

const AccordionRow: React.FC<AccordionRowProps> = ({
  item,
  isOpen,
  isDark,
  variant,
  isLast,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!contentRef.current || !innerRef.current) return;

    if (isOpen) {
      const targetHeight = innerRef.current.offsetHeight;
      gsap.to(contentRef.current, {
        height: targetHeight,
        duration: 0.3,
        ease: "power2.out",
      });
      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          rotate: 180,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          rotate: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "transition-colors",
        variant === "bordered" &&
          !isLast &&
          `border-b ${isDark ? "border-zinc-800" : "border-gray-200"}`,
        variant === "separated" &&
          `rounded-lg border mb-2 ${
            isDark
              ? "bg-zinc-900 border-zinc-800 text-gray-100"
              : "bg-white border-gray-200 text-gray-900 shadow-sm"
          }`
      )}
    >
      <button
        type="button"
        disabled={item.disabled}
        onClick={onToggle}
        className={cn(
          "w-full px-5 py-4 flex items-center justify-between font-medium text-left transition-colors outline-none cursor-pointer",
          item.disabled && "opacity-50 cursor-not-allowed",
          isDark
            ? "hover:bg-zinc-800/60 text-gray-100"
            : "hover:bg-gray-50 text-gray-900"
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && (
            <span
              className={isDark ? "text-indigo-400" : "text-indigo-600"}
            >
              {item.icon}
            </span>
          )}
          <span className="text-base font-semibold">{item.title}</span>
        </div>
        <ChevronDown
          ref={chevronRef}
          size={18}
          className={cn(
            "shrink-0 transition-transform duration-200",
            isDark ? "text-gray-400" : "text-gray-500"
          )}
        />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden h-0 transition-all duration-300"
      >
        <div
          ref={innerRef}
          className={cn(
            "px-5 pb-5 pt-1 text-sm leading-relaxed",
            isDark ? "text-gray-400" : "text-gray-600"
          )}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
};
