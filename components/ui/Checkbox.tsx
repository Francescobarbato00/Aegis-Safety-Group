import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, ...props }, ref) {
    return (
      <label className="group flex cursor-pointer items-start gap-3">
        <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/[0.2] bg-white/[0.04] transition-colors",
            "group-hover:border-white/[0.3]",
            "peer-checked:border-accent peer-checked:bg-accent peer-checked:[&_svg]:opacity-100",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-dark",
            className,
          )}
        >
          <Check className="h-3 w-3 text-white opacity-0" strokeWidth={3} />
        </span>
        <span className="text-sm leading-snug text-fg-dark">{label}</span>
      </label>
    );
  },
);
