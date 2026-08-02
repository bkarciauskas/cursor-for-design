import { cn } from "@/lib/cn";

export type AvatarSize = "xs" | "sm" | "md";

const sizes: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
};

/* Deterministic tint per person so the same teammate reads the same colour
   on every screen without storing an avatar asset. */
const tints = [
  "bg-[#e5d9c8] text-[#5b4a32] dark:bg-[#3b3325] dark:text-[#e0cfb2]",
  "bg-[#d8e0d2] text-[#3b5136] dark:bg-[#28331f] dark:text-[#c3d8b8]",
  "bg-[#dcd9e6] text-[#453f5c] dark:bg-[#2e2b3a] dark:text-[#cbc5e0]",
  "bg-[#e6d6d6] text-[#5c3d3d] dark:bg-[#382828] dark:text-[#dfbdbd]",
  "bg-[#d3e0e6] text-[#33505c] dark:bg-[#22323a] dark:text-[#b9d5e0]",
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function tintFor(name: string) {
  const sum = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tints[sum % tints.length];
}

export function Avatar({
  name,
  size = "sm",
  className,
}: {
  name: string;
  size?: AvatarSize;
  className?: string;
}) {
  return (
    <span
      title={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold select-none",
        "ring-1 ring-border",
        sizes[size],
        tintFor(name),
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarStack({
  names,
  max = 4,
  size = "xs",
}: {
  names: string[];
  max?: number;
  size?: AvatarSize;
}) {
  const shown = names.slice(0, max);
  const overflow = names.length - shown.length;

  return (
    <div className="flex items-center -space-x-1.5">
      {shown.map((name) => (
        <Avatar key={name} name={name} size={size} className="ring-2 ring-card" />
      ))}
      {overflow > 0 && (
        <span className="text-muted bg-card-03 ring-card inline-flex size-6 items-center justify-center rounded-full text-[10px] font-semibold ring-2">
          +{overflow}
        </span>
      )}
    </div>
  );
}
