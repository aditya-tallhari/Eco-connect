"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  indicatorClassName?: string; // Custom class just for the indicator
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props} // Spread only valid props here
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full flex-1 bg-primary transition-transform",
        indicatorClassName
      )}
      style={{ transform: `translateX(${-(100 - value)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";

export { Progress };
