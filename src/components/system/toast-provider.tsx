'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ToastItem {
  id: number;
  msg: string;
  leaving: boolean;
}

interface ToastContextValue {
  toast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 1;

/**
 * Toast system — same visual and behavior as the source site:
 * stacked bottom-left, auto-dismiss after 2.8s, fade-out, aria-live polite.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<number[]>([]);

  const toast = useCallback((msg: string) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, msg, leaving: false }]);
    const dismiss = window.setTimeout(() => {
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      const remove = window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 420);
      timers.current.push(remove);
    }, 2800);
    timers.current.push(dismiss);
  }, []);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toasts" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast${t.leaving ? ' out' : ''}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
