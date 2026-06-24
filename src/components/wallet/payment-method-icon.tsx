import { Wallet, Landmark, Smartphone, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  wallet: Wallet,
  bank: Landmark,
  smartphone: Smartphone,
};

export function PaymentMethodIcon({ icon }: { icon: string }) {
  const Icon = icons[icon] ?? Wallet;
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Icon className="size-5" />
    </div>
  );
}
