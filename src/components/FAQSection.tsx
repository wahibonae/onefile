"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  const faqItems = [
    {
      id: "item-1",
      question: "How many files can I combine with OneFile?",
      answer: "There's no limit! Combine 10, 100, or even 1,000+ files into one. The only constraint is your browser's memory, which can typically handle thousands of files without issues.",
    },
    {
      id: "item-2",
      question: "Does this work with ChatGPT's free plan?",
      answer: "Yes! ChatGPT free users are limited to uploading 3 files per day. With OneFile, you can merge unlimited files into one text file and upload that single file to ChatGPT, bypassing the 3-file restriction entirely. Even Plus users benefit by avoiding the frustration of uploading files in batches of 10 for large projects.",
    },
    {
      id: "item-3",
      question: "Is my data private and secure?",
      answer: "Absolutely. All file processing happens locally in your web browser using JavaScript. Your files never touch our servers or get uploaded to the internet. It's as private as opening a file on your computer.",
    },
    {
      id: "item-4",
      question: "Can I upload an entire GitHub repository?",
      answer: "Yes! Use our GitHub import feature to browse and select files from any public repository. You can also download a repo as a ZIP, extract it, and upload the entire folder. OneFile automatically respects .gitignore files and skips node_modules, .git, and other unnecessary directories.",
    },
    {
      id: "item-5",
      question: "What file types are supported?",
      answer: "OneFile supports 50+ file types including PDFs (.pdf), Microsoft Office files (.docx, .xlsx, .pptx), code files (.js, .py, .java, .cpp, .tsx, etc.), text files (.txt, .md, .csv), configuration files (.json, .yaml, .env), and many more. Images and binary files are automatically filtered out.",
    },
    {
      id: "item-6",
      question: "How does OneFile handle large files?",
      answer: "Complex document formats like PDFs, DOCX, and XLSX are processed on our server to extract text content, while simple text files are processed instantly in your browser. The combined output is optimized for AI context windows, typically staying under 1-2MB for easy uploading.",
    },
    {
      id: "item-7",
      question: "Does OneFile work on mobile devices?",
      answer: "Yes! OneFile is fully responsive and works on smartphones and tablets. However, for the best experience with large folder uploads, we recommend using a desktop or laptop browser.",
    },
    {
      id: "item-8",
      question: "Is OneFile really free?",
      answer: "Yes, completely free with no hidden costs, no account required, and no usage limits. OneFile is open-source software released under the MIT license. You can even host your own version if you want!",
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Find answers to common questions about OneFile and how it works.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card w-full rounded-2xl border border-border px-4 sm:px-8 py-3 shadow-sm"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-dashed border-border last:border-b-0"
              >
                <AccordionTrigger className="cursor-pointer text-sm sm:text-base text-left hover:no-underline text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
