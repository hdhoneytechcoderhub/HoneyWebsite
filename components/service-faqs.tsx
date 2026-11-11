import type { DemoService } from "@/lib/demo-content";

export function ServiceFaqs({ faqs }: { faqs: DemoService["faqs"] }) {
  return <div className="service-faq-list">
    {faqs.map((faq, index) => <details className="service-faq" key={`${faq.question}-${index}`}>
      <summary>{faq.question}<span aria-hidden="true">+</span></summary>
      <p>{faq.answer}</p>
    </details>)}
  </div>;
}
