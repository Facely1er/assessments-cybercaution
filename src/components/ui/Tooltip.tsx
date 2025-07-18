import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../utils/cn';

const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip = ({
  children,
  content,
  side = 'top',
  align = 'center',
  delayDuration = 200,
  skipDelayDuration = 300,
  disableHoverableContent = false,
  open,
  onOpenChange,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
      open={open}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

interface TooltipContentProps extends TooltipPrimitive.TooltipContentProps {
  children: React.ReactNode;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md px-3 py-1.5",
      "bg-slate-900 dark:bg-slate-800",
      "text-xs text-slate-50 dark:text-slate-100",
      "shadow-md",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow className="fill-slate-900 dark:fill-slate-800" />
  </TooltipPrimitive.Content>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Simple tooltip hook for programmatic control
export const useTooltip = (defaultOpen = false) => {
  const [open, setOpen] = React.useState(defaultOpen);
  
  return {
    open,
    onOpenChange: setOpen,
    show: () => setOpen(true),
    hide: () => setOpen(false),
    toggle: () => setOpen(prev => !prev),
  };
};

// Compound component exports for advanced usage
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
};