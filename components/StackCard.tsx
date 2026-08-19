type StackCardProps = {
  number: string;
  title: string;
  description: string;
  background: string;
  shape: React.ReactNode;
};

export function StackCard({ number, title, description, background, shape }: StackCardProps) {
  return (
    <div
      className={`stack-card sticky top-16 flex min-h-[100dvh] items-center overflow-hidden rounded-t-[2.5rem] border-t border-white/10 px-4 sm:px-6 lg:px-8 ${background}`}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center md:flex">
        {shape}
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-2">
        <div className="max-w-lg">
          <span className="font-display text-sm font-semibold tracking-wide text-foreground/50">
            {number}
          </span>
          <h3 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
