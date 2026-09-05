import React, { useState, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipVariants = cva(
  "absolute z-[100] px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shadow-md pointer-events-none transition-all duration-200",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white border border-slate-700 shadow-slate-900/50",
        light: "bg-white text-gray-900 border border-gray-200 shadow-gray-200/50",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
    },
  }
);

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  variant?: "dark" | "light";
  delay?: number;
  animate?: boolean;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = "top",
      variant = "dark",
      delay = 0,
      animate = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const arrowVariants = {
      top:
        variant === "dark"
          ? "border-t-slate-900 border-x-transparent border-b-transparent border-t-4 top-full left-1/2 -translate-x-1/2"
          : "border-t-white border-x-transparent border-b-transparent border-t-4 top-full left-1/2 -translate-x-1/2",
      bottom:
        variant === "dark"
          ? "border-b-slate-900 border-x-transparent border-t-transparent border-b-4 bottom-full left-1/2 -translate-x-1/2"
          : "border-b-white border-x-transparent border-t-transparent border-b-4 bottom-full left-1/2 -translate-x-1/2",
      left:
        variant === "dark"
          ? "border-l-slate-900 border-y-transparent border-r-transparent border-l-4 left-full top-1/2 -translate-y-1/2"
          : "border-l-white border-y-transparent border-r-transparent border-l-4 left-full top-1/2 -translate-y-1/2",
      right:
        variant === "dark"
          ? "border-r-slate-900 border-y-transparent border-l-transparent border-r-4 right-full top-1/2 -translate-y-1/2"
          : "border-r-white border-y-transparent border-l-transparent border-r-4 right-full top-1/2 -translate-y-1/2",
    };

    return (
      <div
        className="relative inline-flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
        {isVisible && (
          <div
            ref={ref}
            role="tooltip"
            className={cn(
              tooltipVariants({ position, variant }),
              animate && "animate-fadeIn",
              className
            )}
            {...props}
          >
            {content}
            <span
              className={cn(
                "absolute w-0 h-0 border-style-solid pointer-events-none",
                arrowVariants[position]
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants };
