import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./site.css";

/* Inter is the family already referenced throughout the stylesheets. Loading it
   through next/font self-hosts the same variable font (weights 100-900) for dev
   and production, so Windows and Linux no longer fall back to different fonts. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
});
const origin=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000").replace(/\/$/,"");
export const metadata:Metadata={metadataBase:new URL(origin),title:{default:"Honey Media House | Social, Strategy & Creative",template:"%s | Honey Media House"},description:"An independent social media marketing and creative studio. Thoughtful strategy, standout social content, Reels, paid campaigns and creative production for ambitious brands.",alternates:{canonical:"/"},openGraph:{type:"website",siteName:"Honey Media House",title:"Honey Media House | Social, Strategy & Creative",description:"Thoughtful social strategy and creative for brands that want to mean something.",url:origin,images:["/images/honey-media-house-logo.svg"]},twitter:{card:"summary_large_image",title:"Honey Media House",description:"Thoughtful social strategy and creative for brands that want to mean something."},robots:{index:true,follow:true}};
/* suppressHydrationWarning: browser extensions add attributes to <html>/<body>
   (bis_skin_checked, webcrx, __processed_*) before React hydrates, which otherwise
   reports a false hydration mismatch that the app cannot patch up. */
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={inter.variable} suppressHydrationWarning><body suppressHydrationWarning>{children}</body></html>}
