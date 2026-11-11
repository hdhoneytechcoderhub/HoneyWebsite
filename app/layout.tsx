import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
const origin=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000").replace(/\/$/,"");
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:"Honey Media House | Social, Strategy & Creative",template:"%s | Honey Media House"},description:"An independent social media marketing and creative studio. Thoughtful strategy, standout social content, Reels, paid campaigns and creative production for ambitious brands.",alternates:{canonical:"/"},openGraph:{type:"website",siteName:"Honey Media House",title:"Honey Media House | Social, Strategy & Creative",description:"Thoughtful social strategy and creative for brands that want to mean something.",url:origin,images:["/images/honey-media-house-reference.png"]},twitter:{card:"summary_large_image",title:"Honey Media House",description:"Thoughtful social strategy and creative for brands that want to mean something."},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
