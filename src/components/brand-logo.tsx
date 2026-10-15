/* Production lockup is a square PNG; next/image adds little on a static export. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { site } from "@/data/site";

const sizes = {
  header: "h-14 w-14 sm:h-16 sm:w-16",
  footer: "h-16 w-16",
  hero: "h-auto w-full max-w-[20rem]",
  poster: "mx-auto h-auto w-full max-w-[16rem]",
} as const;

type BrandLogoProps = {
  size?: keyof typeof sizes;
  linked?: boolean;
};

export function BrandLogo({ size = "header", linked = true }: BrandLogoProps) {
  const image = (
    <img
      src={site.brand.logoSrc}
      alt={linked ? "" : site.name}
      width={1080}
      height={1081}
      className={`${sizes[size]} object-contain`}
    />
  );

  if (!linked) {
    return image;
  }

  return (
    <Link href="/" className="inline-flex shrink-0 no-underline" aria-label={site.name}>
      {image}
    </Link>
  );
}
