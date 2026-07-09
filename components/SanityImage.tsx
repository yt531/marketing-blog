"use client";

import Image, { ImageProps } from "next/image";
import { sanityImageLoader } from "@/lib/sanity.client";

export default function SanityImage(props: ImageProps) {
  return <Image loader={sanityImageLoader} {...props} />;
}
