import { Bird, Shield, Scales, Waves } from "@phosphor-icons/react";
import type { Virtue } from "../types/quote";

const virtueIcons: Record<Virtue, React.ElementType> = {
  wisdom: Bird,
  courage: Shield,
  justice: Scales,
  temperance: Waves,
};

export function VirtueLabel({ virtue }: { virtue: Virtue }) {
  const Icon = virtueIcons[virtue];
  const label = virtue.charAt(0).toUpperCase() + virtue.slice(1);

  return (
    <div className="flex items-center justify-center gap-2 text-secondary tracking-[0.25em] uppercase text-xs mb-10">
      <Icon size={14} weight="light" />
      {label}
    </div>
  );
}
