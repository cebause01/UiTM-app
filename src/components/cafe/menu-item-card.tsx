"use client";

import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppImage } from "@/components/ui/app-image";
import { formatCurrency } from "@/lib/data";
import type { MenuItem } from "@/lib/types";

interface MenuItemCardProps {
  item: MenuItem;
  quantity?: number;
  onAdd: () => void;
  onUpdateQuantity?: (qty: number) => void;
}

export function MenuItemCard({
  item,
  quantity = 0,
  onAdd,
  onUpdateQuantity,
}: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <CardContent className="p-0">
        <div className="flex gap-3 p-3">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
            <AppImage src={item.image} alt={item.name} fill />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h4 className="text-sm font-semibold leading-tight">{item.name}</h4>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">
                  {formatCurrency(item.price)}
                </span>
                {item.popular && (
                  <Badge variant="secondary" className="text-[10px]">
                    Popular
                  </Badge>
                )}
              </div>
              {quantity > 0 && onUpdateQuantity ? (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => onUpdateQuantity(quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="default"
                    size="icon-sm"
                    onClick={() => onUpdateQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={onAdd}>
                  <Plus className="size-4" />
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
