import {
  Home,
  Wrench,
  Palette,
  Sparkles,
  Flower2,
  Car,
  Truck,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Wrench,
  Palette,
  Sparkles,
  Flower2,
  Car,
  Truck,
  GraduationCap,
  Briefcase,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Briefcase;
  return <Icon className={className} />;
}
