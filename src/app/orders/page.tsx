"use client";

import { QrCode } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/app-context";
import {
  formatCurrency,
  formatDate,
  orders as seedOrders,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  preparing: "bg-amber-100 text-amber-700",
  ready: "bg-green-100 text-green-700",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { orders } = useApp();
  const allOrders = [...orders, ...seedOrders];

  return (
    <MobileShell>
      <PageHeader title="My Orders" subtitle="Track & view history" showBack />

      <div className="space-y-4 px-4 pb-4">
        {allOrders.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-5xl">📦</span>
            <p className="mt-4 font-medium">No orders yet</p>
          </div>
        ) : (
          allOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{order.cafeName}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.id} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      "capitalize",
                      statusColors[order.status]
                    )}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mt-3 space-y-1">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-muted-foreground"
                    >
                      <span>
                        {item.quantity}× {item.name}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +{order.pointsEarned} points
                      {order.isPreOrder && " · Pre-order"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="text-sm font-medium">{order.pickupTime}</p>
                  </div>
                </div>

                {(order.status === "preparing" || order.status === "ready") && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <QrCode className="size-8 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Show this at pickup
                      </p>
                      <p className="font-mono text-sm font-semibold">
                        {order.qrCode}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </MobileShell>
  );
}
