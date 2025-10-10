import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-2 border-foreground bg-transparent text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all hover:shadow-[0_4px_12px_rgba(212,165,116,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_6px_rgba(212,165,116,0.2)]",
        destructive: "border-2 border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all",
        outline: "border-2 border-input bg-transparent hover:bg-primary/10 hover:border-primary transition-all",
        secondary: "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground transition-all",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
