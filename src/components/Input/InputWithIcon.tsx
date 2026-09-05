import React, { useEffect, useRef } from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/libs/utils";
import gsap from "gsap";
import { useSelector } from "react-redux";

type Props = InputProps & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconColor?: string;
  animated?: boolean;
};

export const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      icon,
      iconPosition = "left",
      className,
      iconColor,
      animated = true,
      ...props
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const themeState = useSelector(
      (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
    );
    const isDark = themeState?.mode === "dark";

    const defaultIconColor = iconColor || (isDark ? "#9ca3af" : "#6b7280");

    useEffect(() => {
      if (!animated || !iconRef.current || !wrapperRef.current) return;
      const input = wrapperRef.current.querySelector("input");

      const handleFocus = () => {
        gsap.to(iconRef.current, {
          scale: 1.15,
          y: 0,
          color: "#6366f1",
          duration: 0.15,
          ease: "power2.out",
        });
      };
      const handleBlur = () => {
        gsap.to(iconRef.current, {
          scale: 1,
          y: 0,
          color: defaultIconColor,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      input?.addEventListener("focus", handleFocus);
      input?.addEventListener("blur", handleBlur);

      return () => {
        input?.removeEventListener("focus", handleFocus);
        input?.removeEventListener("blur", handleBlur);
      };
    }, [animated, defaultIconColor]);

    const paddingClass = icon
      ? iconPosition === "left"
        ? "pl-12"
        : "pr-12"
      : "";

    return (
      <div ref={wrapperRef} className="relative w-full">
        {icon && iconPosition === "left" && (
          <div
            ref={iconRef}
            className={cn(
              "absolute left-3.5 z-10 pointer-events-none transition-all duration-200",
              props.label ? "top-9" : "top-1/2 -translate-y-1/2",
              animated && "will-change-transform will-change-color"
            )}
            style={{ color: defaultIconColor }}
          >
            {icon}
          </div>
        )}

        <Input
          ref={ref}
          {...props}
          className={cn(
            "rounded-xl shadow-sm transition-all duration-200",
            paddingClass,
            className
          )}
        />

        {icon && iconPosition === "right" && (
          <div
            ref={iconRef}
            className={cn(
              "absolute right-3.5 z-10 pointer-events-none transition-all duration-200",
              props.label ? "top-9" : "top-1/2 -translate-y-1/2",
              animated && "will-change-transform will-change-color"
            )}
            style={{ color: defaultIconColor }}
          >
            {icon}
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
