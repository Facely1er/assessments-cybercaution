import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    error = false,
    icon,
    iconPosition = 'left',
    label,
    helperText,
    errorMessage,
    disabled,
    ...props 
  }, ref) => {
    const inputId = React.useId();
    
    const inputClasses = cn(
      "flex h-10 w-full rounded-md border bg-white dark:bg-slate-950 px-3 py-2 text-sm",
      "text-slate-900 dark:text-slate-100",
      "placeholder:text-slate-500 dark:placeholder:text-slate-400",
      "transition-all duration-200",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      {
        "border-slate-300 dark:border-slate-700 focus-visible:ring-electric-blue dark:focus-visible:ring-dark-electric": !error,
        "border-critical-red dark:border-dark-alert focus-visible:ring-critical-red dark:focus-visible:ring-dark-alert": error,
        "pl-10": icon && iconPosition === 'left',
        "pr-10": icon && iconPosition === 'right',
      },
      className
    );

    const iconClasses = cn(
      "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500",
      {
        "left-3": iconPosition === 'left',
        "right-3": iconPosition === 'right',
        "text-critical-red dark:text-dark-alert": error,
      }
    );

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={iconClasses}>
              {icon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
        </div>
        {errorMessage && (
          <p 
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-critical-red dark:text-dark-alert"
          >
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p 
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    error = false,
    label,
    helperText,
    errorMessage,
    disabled,
    ...props 
  }, ref) => {
    const textareaId = React.useId();
    
    const textareaClasses = cn(
      "flex min-h-[80px] w-full rounded-md border bg-white dark:bg-slate-950 px-3 py-2 text-sm",
      "text-slate-900 dark:text-slate-100",
      "placeholder:text-slate-500 dark:placeholder:text-slate-400",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "resize-y",
      {
        "border-slate-300 dark:border-slate-700 focus-visible:ring-electric-blue dark:focus-visible:ring-dark-electric": !error,
        "border-critical-red dark:border-dark-alert focus-visible:ring-critical-red dark:focus-visible:ring-dark-alert": error,
      },
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={textareaClasses}
          ref={ref}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {errorMessage && (
          <p 
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-critical-red dark:text-dark-alert"
          >
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p 
            id={`${textareaId}-helper`}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };