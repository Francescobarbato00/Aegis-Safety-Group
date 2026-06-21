import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3.5 py-2.5 text-fg-dark transition-colors duration-200 placeholder:text-fg-dark-muted/50 focus:border-accent focus:bg-white/[0.06] focus:outline-none aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:bg-red-500/[0.05]";

function Label({
  htmlFor,
  label,
  requiredMark,
}: {
  htmlFor?: string;
  label: string;
  requiredMark?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-fg-dark"
    >
      {label}
      {requiredMark && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );
}

function ErrorMsg({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {error}
    </p>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  requiredMark?: boolean;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, requiredMark, id, className, ...props },
  ref,
) {
  return (
    <div>
      <Label htmlFor={id} label={label} requiredMark={requiredMark} />
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={cn(fieldBase, className)}
        {...props}
      />
      <ErrorMsg error={error} />
    </div>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  requiredMark?: boolean;
};
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, requiredMark, id, className, children, ...props },
  ref,
) {
  return (
    <div>
      <Label htmlFor={id} label={label} requiredMark={requiredMark} />
      <select
        ref={ref}
        id={id}
        aria-invalid={!!error}
        className={cn(fieldBase, "appearance-none", className)}
        {...props}
      >
        {children}
      </select>
      <ErrorMsg error={error} />
    </div>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  requiredMark?: boolean;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, requiredMark, id, className, ...props },
    ref,
  ) {
    return (
      <div>
        <Label htmlFor={id} label={label} requiredMark={requiredMark} />
        <textarea
          ref={ref}
          id={id}
          aria-invalid={!!error}
          className={cn(fieldBase, "resize-y", className)}
          {...props}
        />
        <ErrorMsg error={error} />
      </div>
    );
  },
);
