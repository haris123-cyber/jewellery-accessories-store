import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",allow:"/",disallow:["/checkout","/account"]},sitemap:"https://gallery-accessories.fabled-moss-1219.chatgpt.site/sitemap.xml"}}
