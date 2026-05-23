"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-card w-full rounded-2xl border border-border px-4 sm:px-8 py-3 shadow-sm"
    >
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx}`}
          className="border-b border-dashed border-border last:border-b-0"
        >
          <AccordionTrigger className="cursor-pointer text-sm sm:text-base text-left hover:no-underline text-foreground">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
