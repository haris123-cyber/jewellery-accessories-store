import Image from "next/image";
import { getUnsplashImage } from "./utils";

export function EditorialVisual({
  cell,
  label,
}: {
  cell: number;
  label: string;
}) {
  const slug = label.replace(/ collection$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden bg-sand">
      <Image
        className="absolute inset-0 w-full h-full rounded-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        src={getUnsplashImage(slug)}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
