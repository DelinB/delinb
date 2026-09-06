import Image from 'next/image';

interface SeedImageProps {
  seed: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * next/image wrapper for the site's seeded placeholder images.
 * Uses the same picsum seeds as the source site, with explicit
 * dimensions (CLS-safe) and responsive sizes.
 */
export function SeedImage({
  seed,
  w,
  h,
  alt,
  className,
  sizes = '(max-width: 1000px) 100vw, 900px',
  priority = false,
}: SeedImageProps) {
  return (
    <Image
      src={`https://picsum.photos/seed/${seed}/${w}/${h}.jpg`}
      width={w}
      height={h}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
