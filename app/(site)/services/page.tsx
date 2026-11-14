import type { Metadata } from "next";
import { ServicesPage } from "@/components/services-page";

export const metadata: Metadata = {
  title: "Services",
  description: "Digital marketing, IT, social media, lead generation, HR, sales growth, content strategy and operations services from Honey Media House.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return <ServicesPage />;
}
