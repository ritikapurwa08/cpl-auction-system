"use client";

import * as React from "react";
// Make sure you're importing from the correct path
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface LoadingButtonProps {
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { className, children, loadingText, isLoading = false, disabled, ...props },
    ref
  ) => {
    return (
      <Button
        className={cn(className)}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? ( // Conditionally render loading state OR children
          <span className="flex flex-row items-center justify-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {loadingText && <span className="">{loadingText}</span>}
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
