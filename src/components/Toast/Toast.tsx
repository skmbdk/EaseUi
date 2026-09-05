import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/libs/utils";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: {
    (msg: Omit<ToastMessage, "id">): void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = `toast-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastMessage = {
      id,
      duration: 4000,
      type: "info",
      ...msg,
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastFunctions = Object.assign(addToast, {
    success: (title: string, description?: string) =>
      addToast({ title, description, type: "success" }),
    error: (title: string, description?: string) =>
      addToast({ title, description, type: "error" }),
    warning: (title: string, description?: string) =>
      addToast({ title, description, type: "warning" }),
    info: (title: string, description?: string) =>
      addToast({ title, description, type: "info" }),
  });

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4 items-start";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2 items-center";
      case "bottom-left":
        return "bottom-4 left-4 items-start";
      case "bottom-right":
        return "bottom-4 right-4 items-end";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2 items-center";
      case "top-right":
      default:
        return "top-4 right-4 items-end";
    }
  };

  return (
    <ToastContext.Provider value={{ toast: toastFunctions, removeToast }}>
      {children}

      {/* Floating Toast Notification Container */}
      <div
        className={cn(
          "fixed z-[100] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4",
          getPositionClasses()
        )}
      >
        {toasts.map((toastItem) => (
          <ToastCard
            key={toastItem.id}
            toast={toastItem}
            onClose={() => removeToast(toastItem.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastCardProps {
  toast: ToastMessage;
  onClose: () => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const themeState = useSelector(
    (state: { theme?: { mode: "light" | "dark" } }) => state?.theme
  );
  const isDark = themeState?.mode === "dark";

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: -12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }

    if (toast.duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleDismiss = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />;
      case "error":
        return <AlertCircle className="text-rose-500 shrink-0" size={20} />;
      case "warning":
        return <AlertTriangle className="text-amber-500 shrink-0" size={20} />;
      case "info":
      default:
        return <Info className="text-indigo-500 shrink-0" size={20} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "pointer-events-auto w-full p-4 rounded-xl border shadow-lg flex items-start gap-3 transition-colors",
        isDark
          ? "bg-zinc-900 border-zinc-800 text-gray-100 shadow-black/50"
          : "bg-white border-gray-200 text-gray-900 shadow-gray-200/80"
      )}
    >
      {getIcon()}
      <div className="flex-1 space-y-0.5 min-w-0">
        <h4 className="font-semibold text-sm leading-snug">{toast.title}</h4>
        {toast.description && (
          <p
            className={cn(
              "text-xs leading-relaxed",
              isDark ? "text-gray-400" : "text-gray-600"
            )}
          >
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className={cn(
          "p-1 rounded-md transition-colors shrink-0 outline-none",
          isDark
            ? "hover:bg-zinc-800 text-gray-400 hover:text-gray-200"
            : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
        )}
      >
        <X size={16} />
      </button>
    </div>
  );
};
