import Storefront from "@/components/storefront";
import type { Metadata } from "next";
import { getProduct } from "@/lib/catalog";
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;const [root,detail]=slug;if(root==="product"){const p=getProduct(detail);return{title:p.name,description:p.description}}const names:Record<string,string>={shop:"All Accessories",category:`${detail?.[0]?.toUpperCase()??""}${detail?.slice(1)??""}`,search:"Search",cart:"Shopping Bag",checkout:"Checkout",wishlist:"Wishlist",journal:"Journal",about:"Our Story",contact:"Contact",faq:"FAQ","shipping-returns":"Shipping & Returns",account:"My Account","track-order":"Track Order"};return{title:names[root]??"GALLERY",description:"Refined accessories designed for modern everyday life."}}
export default async function DynamicPage({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;return <Storefront segments={slug}/>}
