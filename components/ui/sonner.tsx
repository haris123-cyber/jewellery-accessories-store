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
      style={{ "--width": "min(94vw, 560px)" } as React.CSSProperties}
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
            "group toast bg-[#FAF7F2] text-[#1B1A17] border border-[#E7DFD3] shadow-[0_16px_40px_rgba(27,26,23,0.14),0_2px_8px_rgba(27,26,23,0.06)] rounded-[22px] font-sans text-[13px] py-3.5 px-4.5 flex items-center gap-3.5 tracking-normal z-[99999] data-[unstyled=true]:!bg-transparent data-[unstyled=true]:!border-none data-[unstyled=true]:!shadow-none data-[unstyled=true]:!p-0 data-[unstyled=true]:!rounded-none",
          title: "font-serif text-[16px] sm:text-[17.5px] font-medium text-[#1B1A17] tracking-tight",
          description: "text-[#635C50] text-[12px] font-sans mt-0.5",
          actionButton:
            "bg-[#0F3D2E] hover:bg-[#154E3B] active:bg-[#0A2A20] text-white text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.14em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-[0_2px_8px_rgba(15,61,46,0.25)]",
          cancelButton:
            "bg-[#EFE8DC] text-[#1B1A17] text-[11px] uppercase tracking-wider font-medium px-4 py-2 rounded-full transition-colors",
          success: "!bg-[#FAF7F2] !text-[#1B1A17] !border-[#E7DFD3]",
          error: "!bg-[#FAF7F2] !text-[#1B1A17] !border-[#E8C5C3]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
