export type Category = "bags" | "rings" | "necklaces" | "earrings" | "bracelets" | "watches" | "sunglasses" | "wallets" | "belts" | "travel" | "gifts";
export type Product = { id:string; slug:string; name:string; category:Category; price:number; compareAtPrice?:number; description:string; colors:string[]; material:string; rating:number; reviewCount:number; badge?:string; stock:number; cell:number; image:string; };

import { productsData } from "./data";
export const products: Product[] = productsData;

export const categories = [
  {slug:"rings",label:"Rings",cell:0},
  {slug:"necklaces",label:"Necklaces",cell:1},
  {slug:"earrings",label:"Earrings",cell:2},
  {slug:"bracelets",label:"Bracelets",cell:3},
  {slug:"watches",label:"Watches",cell:4},
  {slug:"bags",label:"Bags",cell:5},
  {slug:"sunglasses",label:"Sunglasses",cell:6},
  {slug:"wallets",label:"Wallets",cell:7},
  {slug:"travel",label:"Travel",cell:8},
  {slug:"gifts",label:"Gifting",cell:9},
] as const;
export const getProduct = (slug?:string) => products.find((p)=>p.slug===slug) ?? products[0];
export const money = (value:number) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
