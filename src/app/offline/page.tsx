import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <span className="text-5xl">📡</span>
      <h1 className="mt-4 text-xl font-bold">You&apos;re Offline</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Check your internet connection and try again
      </p>
      <Link href="/home" className={cn(buttonVariants(), "mt-6")}>
        Retry
      </Link>
    </div>
  );
}
