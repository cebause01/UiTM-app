"use client";

import { BottomNav } from "./bottom-nav";

interface MobileShellProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function MobileShell({ children, showNav = true }: MobileShellProps) {
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md bg-background shadow-xl shadow-uitm-navy/8">
      <main className={showNav ? "pb-24" : ""}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}
