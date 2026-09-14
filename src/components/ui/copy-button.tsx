'use client';

import { useToast } from '@/components/system/toast-provider';

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      /* clipboard unavailable */
    }
    ta.remove();
  }
}

interface CopyButtonProps {
  text: string;
  message?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

/** Copy-to-clipboard button with toast feedback — the `[data-copy]` pattern from the source. */
export function CopyButton({ text, message, className, children, ariaLabel }: CopyButtonProps) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        copyText(text).then(() => toast(message ?? 'Copied to clipboard'));
      }}
    >
      {children}
    </button>
  );
}
