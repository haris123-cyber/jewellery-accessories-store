export type Category = "bags" | "jewelry" | "watches" | "sunglasses" | "wallets" | "belts" | "travel" | "gifts";
export type Product = { id:string; slug:string; name:string; category:Category; price:number; compareAtPrice?:number; description:string; colors:string[]; material:string; rating:number; reviewCount:number; badge?:string; stock:number; cell:number; image:string; };

import { productsData } from "./data";
export const products: Product[] = productsData;

export const categories = [
  {slug:"bags",label:"Bags",cell:0},{slug:"jewelry",label:"Jewelry",cell:1},{slug:"watches",label:"Watches",cell:2},
  {slug:"sunglasses",label:"Sunglasses",cell:3},{slug:"wallets",label:"Wallets",cell:4},{slug:"travel",label:"Travel",cell:5},
] as const;
export const getProduct = (slug?:string) => products.find((p)=>p.slug===slug) ?? products[0];
export const money = (value:number) => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
