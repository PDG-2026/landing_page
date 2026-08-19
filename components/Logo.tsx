import Image from "next/image";

type LogoProps = {
  className?: string;
  wordmarkClassName?: string;
  monochrome?: boolean;
};

export function Logo({ className = "", wordmarkClassName = "", monochrome = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/icons/pdg_logo-no-background.png" alt="VaultKey Logo" width={32} height={32} className="h-8 w-8" />
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          monochrome ? "text-accent" : "text-foreground"
        } ${wordmarkClassName}`}
      >
        Keypr
      </span>
    </span>
  );
}
