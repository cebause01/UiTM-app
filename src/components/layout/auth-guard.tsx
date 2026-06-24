"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "@/context/app-context";

const publicRoutes = ["/", "/login", "/offline"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublic = publicRoutes.includes(pathname);
    if (!isAuthenticated && !isPublic) {
      router.replace("/login");
    }
    if (isAuthenticated && (pathname === "/" || pathname === "/login")) {
      router.replace("/home");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
