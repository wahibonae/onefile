import { AlertCircle, Info, Lightbulb } from "lucide-react";
import { ReactNode } from "react";

type CalloutVariant = "info" | "warning" | "tip";

interface CalloutProps {
  variant?: CalloutVariant;
  children: ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-yellow-500/5",
    borderColor: "border-yellow-500/20",
    textColor: "text-yellow-700 dark:text-yellow-300",
    iconColor: "text-yellow-500",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-green-500/5",
    borderColor: "border-green-500/20",
    textColor: "text-green-700 dark:text-green-300",
    iconColor: "text-green-500",
  },
};

export function Callout({ variant = "info", children }: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 flex gap-3 rounded-xl border p-4 ${config.bgColor} ${config.borderColor} ${config.textColor}`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <div className="flex-1 text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}
