import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function PublicLayout({children}:{children:React.ReactNode}){return <><a className="studio-skip-link" href="#main-content">Skip to content</a><SiteHeader/><main id="main-content" className="page-main">{children}</main><SiteFooter/></>}
