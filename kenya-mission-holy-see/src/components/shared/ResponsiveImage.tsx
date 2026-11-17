import Image, { type ImageProps } from "next/image";

type ResponsiveImageProps = Omit<ImageProps, "alt" | "sizes"> & {
  alt: string;
};

export function ResponsiveImage({ alt, ...props }: ResponsiveImageProps) {
  return (
    <Image
      alt={alt}
      sizes="(max-width: 768px) 100vw, 1180px"
      {...props}
    />
  );
}
