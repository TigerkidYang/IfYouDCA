import { ElementType } from "react";

interface ResultCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon?: ElementType;
  prefix?: string;
}

export default function ResultCard({
  label,
  value,
  subtitle,
  color,
  bgColor,
  borderColor,
  icon: Icon,
  prefix,
}: ResultCardProps) {
  return (
    <div className={`rounded-lg border p-4 ${bgColor} ${borderColor}`}>
      <p className="text-xs md:text-sm font-medium text-brand-gray-600 mb-1">
        {label}
      </p>
      <div className="flex items-center justify-center gap-1">
        {Icon && <Icon className={`h-5 w-5 ${color}`} />}
        <p className={`text-xl md:text-2xl font-bold ${color}`}>
          {prefix && <span className="text-lg">{prefix}</span>}
          {value}
        </p>
      </div>
      <p className="text-xs text-brand-gray-500 mt-1 hidden md:block">
        {subtitle}
      </p>
    </div>
  );
}
