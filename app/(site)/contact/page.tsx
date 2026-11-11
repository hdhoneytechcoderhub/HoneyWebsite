import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell Honey Media House about your social media marketing or creative project. Send a secure enquiry and our team will be in touch.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactRoute({ searchParams }: Props) {
  const { service = "" } = await searchParams;
  return <ContactPage initialService={service} />;
}
