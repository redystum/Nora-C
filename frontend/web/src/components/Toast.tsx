import { h } from 'preact';
import {Info, X} from "lucide-preact";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast = ({ message, onClose }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 min-w-75 max-w-md">
        <Info size={16} className="text-red-500" />
        <span className="font-medium text-sm grow">{message}</span>
        <button
          onClick={onClose}
          className="hover:bg-red-500/10 p-1.5 rounded-lg transition-colors text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
