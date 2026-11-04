import type { Metadata } from "next";
import "./globals.css";
const origin=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000").replace(/\/$/,"");
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:"Honey Media House | Creating Brands, Guiding Careers",template:"%s | Honey Media House"},description:"Digital marketing, IT solutions, HR consulting, sales growth and content strategy for ambitious brands.",alternates:{canonical:"/"},openGraph:{type:"website",siteName:"Honey Media House",title:"Honey Media House | Creating Brands, Guiding Careers",description:"A thoughtful partner for digital growth.",url:origin,images:["/images/honey-media-house-reference.png"]},twitter:{card:"summary_large_image",title:"Honey Media House",description:"Creating Brands, Guiding Careers."},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
