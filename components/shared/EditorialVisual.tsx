import Image from "next/image";
import { getUnsplashImage } from "./utils";

const categoryImages: Record<string, string> = {
  rings: "https://plus.unsplash.com/premium_photo-1678834778658-9862d9987dd3?q=80&w=1170&auto=format&fit=crop",
  necklaces: "https://images.unsplash.com/photo-1758995115785-d13726ac93f0?q=80&w=1170&auto=format&fit=crop",
  earrings: "1515562141207-7a88fb7ce338",
  bracelets: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop",
  watches: "https://images.unsplash.com/photo-1786124967103-875dda046e85?q=80&w=2080&auto=format&fit=crop",
  bags: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=1529&auto=format&fit=crop",
  sunglasses: "https://images.unsplash.com/photo-1610136649349-0f646f318053?q=80&w=1170&auto=format&fit=crop",
  wallets: "https://images.unsplash.com/photo-1682342232979-90ece06a0945?q=80&w=692&auto=format&fit=crop",
  
};

export function EditorialVisual({
  cell,
  label,
}: {
  cell: number;
  label: string;
}) {
  const slug = label.replace(/ collection$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const categoryImage = categoryImages[slug];
  const image = categoryImage
    ? categoryImage.startsWith("https://")
      ? categoryImage
      : `https://images.unsplash.com/photo-${categoryImage}?w=800&q=80&auto=format&fit=crop`
    : getUnsplashImage(slug);

  return (
    <div className="relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden bg-sand">
      <Image
        className="absolute inset-0 w-full h-full rounded-2xl object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        src={image}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
