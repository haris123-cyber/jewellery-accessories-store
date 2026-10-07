export const unsplashImages = [
  "1599643478514-462ce330f619",
  "1600125740428-f6ee3778a87c",
  "1515562141207-7a88fb7ce338",
  "1584916201218-f4242ceb4809",
  "1611085583191-a3b181a88401",
  "1596944924616-7b38e7cfac36",
  "1601121141461-9d6647bca1ed",
  "1575844265571-0008dd52f144",
  "1599643477123-575005b63004",
  "1611591437281-460bfbe1220a",
  "1629224316810-9d8805b95e76",
  "1610461853106-96b17c2f62cb",
];

export const getUnsplashImage = (slug: string) => {
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const id = unsplashImages[hash % unsplashImages.length];
  return `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;
};
