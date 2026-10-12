"use client";

import {
  CircleCheck,
  Info,
  Loader2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheck className="size-4 text-emerald-700 shrink-0" />,
        info: <Info className="size-4 text-stone shrink-0" />,
        warning: <AlertTriangle className="size-4 text-amber-700 shrink-0" />,
        error: <XCircle className="size-4 text-red-700 shrink-0" />,
        loading: <Loader2 className="size-4 animate-spin text-stone shrink-0" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-ivory text-ink border border-border/80 shadow-[0_8px_30px_rgba(27,26,23,0.12)] rounded-[4px] font-sans text-[13px] py-3 px-4 flex items-center gap-3 tracking-normal z-[99999]",
          description: "text-stone text-[12px]",
          actionButton:
            "bg-ink text-ivory text-[11px] uppercase tracking-wider font-medium px-3 py-1.5 rounded-[2px] hover:bg-gold transition-colors",
          cancelButton:
            "bg-sand text-ink text-[11px] uppercase tracking-wider font-medium px-3 py-1.5 rounded-[2px] transition-colors",
          success: "!bg-ivory !text-ink !border-emerald-800/30",
          error: "!bg-ivory !text-ink !border-red-800/30",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
