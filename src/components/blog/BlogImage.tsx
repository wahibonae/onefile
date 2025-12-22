import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function BlogImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: BlogImageProps) {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
