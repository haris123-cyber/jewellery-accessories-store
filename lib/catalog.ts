export type Category = "bags" | "jewelry" | "watches" | "sunglasses" | "wallets" | "belts" | "travel" | "gifts";
export type Product = { id:string; slug:string; name:string; category:Category; price:number; compareAtPrice?:number; description:string; colors:string[]; material:string; rating:number; reviewCount:number; badge?:string; stock:number; cell:number };

const collections: Record<Category, string[]> = {
  bags: ["Structured Leather Crossbody", "Linea Leather Tote", "Nocturne Shoulder Bag", "Atelier Mini Satchel", "Arc Suede Hobo", "Studio Bucket Bag", "Portofino Woven Bag", "Sera Evening Clutch"],
  jewelry: ["Sculpted Drop Earrings", "Form Chain Bracelet", "Molten Signet Ring", "Fine Line Necklace", "Orbit Cuff"],
  watches: ["Meridian Leather Watch", "Index Steel Watch", "No. 08 Minimal Watch", "Contour Gold Watch"],
  sunglasses: ["Caro Tortoise Frames", "Luna Oval Sunglasses", "Avenue Black Frames", "Riva Metal Sunglasses"],
  wallets: ["Archive Slim Wallet", "Fold Leather Wallet", "Essential Card Holder"],
  belts: ["Classic Oxblood Belt", "Sculpted Buckle Belt", "Narrow Leather Belt"],
  travel: ["Voyage Leather Pouch", "Weekender Holdall", "Passport Travel Set"],
  gifts: ["The Everyday Edit", "Leather Desk Set", "Jewelry Gift Pair"],
};

const cells: Record<Category, number[]> = { bags:[0,1,10,0,1,10,0,1], jewelry:[5,6,5,6,5], watches:[4,4,4,4], sunglasses:[3,3,3,3], wallets:[2,11,11], belts:[7,7,7], travel:[8,10,8], gifts:[5,11,6] };
export const products: Product[] = Object.entries(collections).flatMap(([category,names], categoryIndex) => names.map((name,index) => {
  const base = 1299 + categoryIndex * 280 + index * 310;
  return { id:`${category}-${index+1}`, slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""), name, category:category as Category, price:base, compareAtPrice:index % 3 === 0 ? Math.round(base*1.22/100)*100-1:undefined, description:`A quietly distinctive ${name.toLowerCase()} shaped for modern everyday life, finished with considered details and lasting materials.`, colors:["#171717", index%2 ? "#6a4331":"#1c3a32", "#c4a57a"], material:category==="jewelry"?"18k gold-plated brass":category==="watches"?"Stainless steel and leather":"Premium full-grain leather", rating:4.5+(index%5)/10, reviewCount:18+index*11, badge:index===0?"NEW":index===2?"BEST SELLER":undefined, stock:index===6?0:5+index*3, cell:cells[category as Category][index] };
}));

export const categories = [
  {slug:"bags",label:"Bags",cell:0},{slug:"jewelry",label:"Jewelry",cell:1},{slug:"watches",label:"Watches",cell:2},
  {slug:"sunglasses",label:"Sunglasses",cell:3},{slug:"wallets",label:"Wallets",cell:4},{slug:"travel",label:"Travel",cell:5},
] as const;
export const getProduct = (slug?:string) => products.find((p)=>p.slug===slug) ?? products[0];
export const money = (value:number) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
