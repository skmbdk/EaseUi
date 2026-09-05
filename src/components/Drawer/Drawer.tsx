import React, { useEffect, useRef } from "react";
import { cn } from "@/libs/utils";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "right",
  title,
  description,
  size = "md",
  children,
  className,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // GSAP slide-in / backdrop blur entrance
  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" }
        );
      }

      if (panelRef.current) {
        const fromProps = {
          right: { x: "100%", y: "0%" },
          left: { x: "-100%", y: "0%" },
          top: { x: "0%", y: "-100%" },
          bottom: { x: "0%", y: "100%" },
        }[position];

        gsap.fromTo(
          panelRef.current,
          fromProps,
          { x: "0%", y: "0%", duration: 0.3, ease: "power3.out" }
        );
      }
    }
  }, [isOpen, position]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    if (position === "left" || position === "right") {
      switch (size) {
        case "sm":
          return "w-72 max-w-full";
        case "lg":
          return "w-96 max-w-full";
        case "full":
          return "w-screen";
        case "md":
        default:
          return "w-80 max-w-full";
      }
    } else {
      switch (size) {
        case "sm":
          return "h-1/3 max-h-full";
        case "lg":
          return "h-2/3 max-h-full";
        case "full":
          return "h-screen";
        case "md":
        default:
          return "h-1/2 max-h-full";
      }
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "top-0 left-0 h-full border-r";
      case "top":
        return "top-0 left-0 w-full border-b";
      case "bottom":
        return "bottom-0 left-0 w-full border-t";
      case "right":
      default:
        return "top-0 right-0 h-full border-l";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        className={cn(
          "fixed flex flex-col shadow-2xl transition-colors z-50",
          getPositionClasses(),
          getSizeClasses(),
          isDark
            ? "bg-zinc-950 border-zinc-800 text-gray-100 shadow-black/80"
            : "bg-white border-gray-200 text-gray-900 shadow-gray-900/20",
          className
        )}
      >
        {/* Drawer Header */}
        {(title || description) && (
          <div
            className={cn(
              "px-6 py-4 border-b flex items-center justify-between transition-colors",
              isDark ? "border-zinc-800" : "border-gray-200"
            )}
          >
            <div>
              {title && <h3 className="font-bold text-lg">{title}</h3>}
              {description && (
                <p
                  className={cn(
                    "text-xs leading-relaxed mt-0.5",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className={cn(
                "p-1.5 rounded-full transition-colors outline-none",
                isDark
                  ? "hover:bg-zinc-800 text-gray-400 hover:text-gray-200"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
              )}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};
