import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  href,
  linkLabel = "See all",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-3 flex items-center justify-between", className)}>
      <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-xs font-medium text-uitm-magenta"
        >
          {linkLabel}
          <ChevronRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
