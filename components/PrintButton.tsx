// components/PrintButton.tsx
"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 border border-hairline px-5 py-2.5 font-mono text-xs tracking-wide text-inkText transition-colors hover:border-accent hover:text-accent"
    >
      PRINT / SAVE AS PDF
    </button>
  );
}