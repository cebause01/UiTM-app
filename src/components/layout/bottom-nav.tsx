"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Store,
  Wallet,
  Gift,
  User,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/cafes", label: "Cafes", icon: Store },
  { href: "/pay", label: "Pay", icon: QrCode, center: true },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-border/60 bg-background/95 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-end justify-around px-2 pt-2 pb-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          if (item.center) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -mt-5 flex flex-col items-center"
              >
                <div
                  className={cn(
                    "flex size-14 items-center justify-center rounded-2xl bg-uitm-brand text-white shadow-lg shadow-uitm-navy/25 transition-transform active:scale-95",
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-[56px] flex-col items-center gap-0.5 rounded-xl px-2 py-1 transition-colors",
                isActive ? "text-uitm-magenta" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
