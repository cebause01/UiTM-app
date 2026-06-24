import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileMenuRowProps {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  description?: string;
}

export function ProfileMenuRow({
  href,
  label,
  icon: Icon,
  badge,
  description,
}: ProfileMenuRowProps) {
  return (
    <Link
      href={href}
      className="flex w-full items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 active:bg-muted"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-uitm-magenta/10 text-uitm-magenta">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {badge !== undefined && (
        <span className="flex size-5 items-center justify-center rounded-full bg-uitm-magenta text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

interface ProfileStatCardProps {
  href: string;
  label: string;
  value: string;
  valueClassName?: string;
}

export function ProfileStatCard({
  href,
  label,
  value,
  valueClassName,
}: ProfileStatCardProps) {
  return (
    <Link href={href} className="block">
      <div
        className={cn(
          "rounded-xl border border-border/60 bg-card p-4 text-center shadow-sm",
          "transition-all hover:border-uitm-magenta/30 hover:shadow-md active:scale-[0.98]"
        )}
      >
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn("mt-1 text-lg font-bold", valueClassName)}>{value}</p>
        <p className="mt-1 text-[10px] font-medium text-uitm-magenta">Tap to view</p>
      </div>
    </Link>
  );
}
