import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue dark:focus-visible:ring-dark-electric focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default: "bg-electric-blue text-white hover:bg-electric-blue/90 dark:bg-dark-electric dark:hover:bg-dark-electric/90 shadow-sm hover:shadow-md",
        outline: "border-2 border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-100",
        destructive: "bg-critical-red text-white hover:bg-critical-red/90 dark:bg-dark-alert dark:hover:bg-dark-alert/90 shadow-sm hover:shadow-md",
        secondary: "bg-dark-navy text-white hover:bg-dark-navy/80 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-sm hover:shadow-md",
        success: "bg-secure-green text-white hover:bg-secure-green/90 dark:bg-green-600 dark:hover:bg-green-700 shadow-sm hover:shadow-md",
        warning: "bg-warning-amber text-slate-900 hover:bg-warning-amber/90 dark:bg-amber-600 dark:text-white dark:hover:bg-amber-700 shadow-sm hover:shadow-md",
        link: "underline-offset-4 hover:underline text-electric-blue dark:text-dark-electric p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? React.Fragment : 'button';
    
    const content = (
      <>
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 -ml-1">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2 -mr-1">{rightIcon}</span>
        )}
      </>
    );

    if (asChild) {
      return (
        <div
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {content}
        </div>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };