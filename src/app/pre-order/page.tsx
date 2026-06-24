"use client";

import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PageHeader } from "@/components/layout/page-header";
import { CafeCard } from "@/components/cafe/cafe-card";
import { AppImage } from "@/components/ui/app-image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cafes, preOrderSlots } from "@/lib/data";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export default function PreOrderPage() {
  const openCafes = cafes.filter((c) => c.isOpen);

  return (
    <MobileShell>
      <PageHeader
        title="Pre-order Food"
        subtitle="Order before class ends"
        showBack
      />

      <div className="px-4">
        <Card className="overflow-hidden border-border/60">
          <div className="relative h-32">
            <AppImage src={images.promos["p-2"]} alt="Pre-order" fill />
            <div className="absolute inset-0 bg-gradient-to-r from-uitm-navy/85 to-uitm-magenta/80" />
            <CardContent className="relative flex h-full flex-col justify-end p-4 text-white">
              <p className="font-semibold">Skip the lunch queue</p>
              <p className="mt-1 text-sm text-white/90">
                Order during class, pick up when the bell rings.
              </p>
            </CardContent>
          </div>
        </Card>

        <section className="mt-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Clock className="size-4 text-primary" />
            Available Pickup Slots
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {preOrderSlots.map((slot) => (
              <Link
                key={slot.id}
                href={slot.available ? "/cafes" : "#"}
                onClick={(e) => !slot.available && e.preventDefault()}
                className={cn(
                  "rounded-xl border p-3 text-center transition-colors",
                  slot.available
                    ? "border-border bg-card hover:border-primary/40 active:scale-[0.98]"
                    : "cursor-not-allowed border-dashed opacity-50"
                )}
              >
                <p className="text-sm font-medium">{slot.label}</p>
                <p className="text-xs text-muted-foreground">{slot.time}</p>
                {!slot.available && (
                  <p className="mt-1 text-[10px] text-destructive">Full</p>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 pb-4">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <MapPin className="size-4 text-primary" />
            Choose a Cafe
          </h2>
          <div className="space-y-3">
            {openCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} compact />
            ))}
          </div>
        </section>

        <div className="sticky bottom-24 pb-4">
          <Link href="/cafes" className={buttonVariants({ className: "w-full" })}>
            Start Pre-ordering
          </Link>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Select items, then choose &quot;Pre-order&quot; at checkout
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
