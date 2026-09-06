'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/system/toast-provider';

/** "Download CV" — announces the print dialog, then opens the résumé print view. */
export function CvButton() {
  const router = useRouter();
  const { toast } = useToast();
  return (
    <button
      className="btn ghost"
      type="button"
      onClick={() => {
        toast('Opening the print dialog — choose "Save as PDF".');
        router.push('/resume');
        window.setTimeout(() => window.print(), 800);
      }}
    >
      Download CV
    </button>
  );
}

/** Print / Save as PDF button used on the résumé page. */
export function PrintButton({ className = 'btn dark' }: { className?: string }) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      Print / Save as PDF
    </button>
  );
}
