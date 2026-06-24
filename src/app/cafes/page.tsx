"use client";

import { Search } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PageHeader } from "@/components/layout/page-header";
import { CafeCard } from "@/components/cafe/cafe-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cafes } from "@/lib/data";
import { useState } from "react";

export default function CafesPage() {
  const [search, setSearch] = useState("");

  const filtered = cafes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const openCafes = filtered.filter((c) => c.isOpen);
  const closedCafes = filtered.filter((c) => !c.isOpen);

  return (
    <MobileShell>
      <PageHeader title="Campus Cafes" subtitle="Order from cafes around UiTM" />
      <div className="px-4">
        <div className="relative mb-4">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cafes, food..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All ({filtered.length})
            </TabsTrigger>
            <TabsTrigger value="open" className="flex-1">
              Open ({openCafes.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-3 pb-4">
            {filtered.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No cafes found
              </p>
            )}
          </TabsContent>
          <TabsContent value="open" className="mt-4 space-y-3 pb-4">
            {openCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
            {closedCafes.length > 0 && (
              <>
                <p className="pt-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Closed
                </p>
                {closedCafes.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileShell>
  );
}
