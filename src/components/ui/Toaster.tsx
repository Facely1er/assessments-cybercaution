import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

type ToastProps = {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
};

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  type = 'default',
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-secure-green/90 text-white';
      case 'error':
        return 'bg-critical-red/90 text-white';
      case 'warning':
        return 'bg-warning-amber/90 text-warning-foreground';
      case 'info':
        return 'bg-electric-blue/90 text-white';
      default:
        return 'bg-electric-blue/90 text-white';
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg shadow-lg p-4 mb-3 animate-in slide-in-from-right',
        getTypeClasses()
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          {description && <p className="text-xs mt-1">{description}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

type ToastData = {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};

// Global toast state management
let toasts: ToastData[] = [];
let listeners: ((toasts: ToastData[]) => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener([...toasts]));
};

export const toast = {
  show: (data: Omit<ToastData, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newToast = { id, ...data };
    toasts.push(newToast);
    notifyListeners();
    return id;
  },
  dismiss: (id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    notifyListeners();
  },
  success: (title: string, description?: string, duration?: number) => {
    return toast.show({ title, description, type: 'success', duration });
  },
  error: (title: string, description?: string, duration?: number) => {
    return toast.show({ title, description, type: 'error', duration });
  },
  warning: (title: string, description?: string, duration?: number) => {
    return toast.show({ title, description, type: 'warning', duration });
  },
  info: (title: string, description?: string, duration?: number) => {
    return toast.show({ title, description, type: 'info', duration });
  }
};

export const Toaster: React.FC = () => {
  const [localToasts, setLocalToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const listener = (updatedToasts: ToastData[]) => {
      setLocalToasts(updatedToasts);
    };
    
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const handleClose = (id: string) => {
    toast.dismiss(id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-72">
      {localToasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={handleClose}
        />
      ))}
    </div>
  );
};