import Image from "next/image";
import { getUnsplashImage } from "./utils";

export function ProductVisual({
  cell,
  name,
  image,
  priority = false,
}: {
  cell: number;
  name: string;
  image?: string;
  priority?: boolean;
}) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-sand group-hover/product:[&>img]:scale-[1.04]">
      {/* Product Image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out z-10"
        src={image || getUnsplashImage(slug)}
        alt={name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
        priority={priority}
      />
    </div>
  );
}
