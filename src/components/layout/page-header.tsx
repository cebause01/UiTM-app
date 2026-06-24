"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  rightAction,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className={cn("sticky top-0 z-40 bg-background/95 backdrop-blur-lg", className)}>
      <div className="flex items-center gap-3 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        {showBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0"
            onClick={() => (backHref ? router.push(backHref) : router.back())}
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </header>
  );
}
