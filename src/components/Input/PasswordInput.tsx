import React, { useState } from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/libs/utils";
import { Eye, EyeOff } from "lucide-react";

type Props = Omit<InputProps, "type">;

export const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [show, setShow] = useState(false);
    return (
      <div className="relative w-full">
        <Input
          {...props}
          ref={ref}
          type={show ? "text" : "password"}
          className={cn("pr-10", props.className)}
        />
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
          className={cn(
            "absolute right-3 z-10 p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors",
            props.label ? "top-8" : "top-1/2 -translate-y-1/2"
          )}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
