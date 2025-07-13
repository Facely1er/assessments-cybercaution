import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-electric-blue text-white hover:bg-electric-blue/90 dark:bg-dark-electric dark:hover:bg-dark-electric/90",
        destructive: "bg-critical-red text-white hover:bg-critical-red/90 dark:bg-dark-alert dark:hover:bg-dark-alert/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/20",
        secondary: "bg-dark-navy text-white hover:bg-dark-navy/80 dark:bg-secondary dark:hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "underline-offset-4 hover:underline text-electric-blue dark:text-dark-electric",
        success: "bg-secure-green text-white hover:bg-secure-green/90",
        warning: "bg-warning-amber text-warning-foreground hover:bg-warning-amber/90",
        orange: "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 dark:bg-[#FF6B00] dark:hover:bg-[#FF6B00]/90",
        white: "bg-white text-foreground hover:bg-white/90 border border-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = 
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button,  };