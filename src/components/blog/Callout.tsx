import { AlertCircle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

type CalloutVariant = "info" | "warning" | "tip" | "success";

interface CalloutProps {
  variant?: CalloutVariant;
  children: ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
  },
  success: {
    icon: CheckCircle2,
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
  },
};

export function Callout({ variant = "info", children }: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border p-4 ${config.bgColor} ${config.borderColor}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <div className="flex-1 text-sm leading-relaxed text-primary [&>p]:m-0 [&>p]:text-primary [&_strong]:text-primary [&_span]:text-primary">
        {children}
      </div>
    </div>
  );
}
