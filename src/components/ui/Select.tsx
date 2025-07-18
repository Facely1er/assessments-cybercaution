import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ 
    value,
    onValueChange,
    options,
    placeholder = "Select an option",
    disabled = false,
    error = false,
    label,
    helperText,
    errorMessage,
    className
  }, ref) => {
    const selectId = React.useId();

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectPrimitive.Trigger
            ref={ref}
            id={selectId}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2",
              "bg-white dark:bg-slate-950",
              "text-sm text-slate-900 dark:text-slate-100",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-400",
              {
                "border-slate-300 dark:border-slate-700 focus:ring-electric-blue dark:focus:ring-dark-electric": !error,
                "border-critical-red dark:border-dark-alert focus:ring-critical-red dark:focus:ring-dark-alert": error,
              }
            )}
            aria-invalid={error}
            aria-describedby={errorMessage ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-md animate-in fade-in-80">
              <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center h-[25px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                <ChevronUp className="h-4 w-4" />
              </SelectPrimitive.ScrollUpButton>
              
              <SelectPrimitive.Viewport className="p-1">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                      "transition-colors duration-150",
                      "focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-900 dark:focus:text-slate-100",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              
              <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center h-[25px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                <ChevronDown className="h-4 w-4" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
        
        {errorMessage && (
          <p 
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-critical-red dark:text-dark-alert"
          >
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p 
            id={`${selectId}-helper`}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// Native HTML Select for simpler use cases
export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ 
    options,
    error = false,
    label,
    helperText,
    errorMessage,
    className,
    ...props 
  }, ref) => {
    const selectId = React.useId();

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white dark:bg-slate-950 px-3 py-2 text-sm",
            "text-slate-900 dark:text-slate-100",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-slate-300 dark:border-slate-700 focus-visible:ring-electric-blue dark:focus-visible:ring-dark-electric": !error,
              "border-critical-red dark:border-dark-alert focus-visible:ring-critical-red dark:focus-visible:ring-dark-alert": error,
            },
            className
          )}
          aria-invalid={error}
          aria-describedby={errorMessage ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p 
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-critical-red dark:text-dark-alert"
          >
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p 
            id={`${selectId}-helper`}
            className="mt-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

NativeSelect.displayName = "NativeSelect";

export { Select, NativeSelect };