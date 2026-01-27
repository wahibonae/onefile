"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { faqs } from "./faq-data";

export default function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            ChatGPT File Upload Limits FAQ
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything about ChatGPT upload limits for Free, Plus, Pro plans - and how to bypass them.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        {categories.map((category) => {
          const categoryFAQs = filteredFAQs.filter(
            (faq) => faq.category === category
          );

          if (categoryFAQs.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                {category}
              </h2>
              <div className="space-y-4">
                {categoryFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* No Results */}
        {filteredFAQs.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No FAQs found matching &quot;{searchQuery}&quot;
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Have Questions */}
        <section className="mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Check out our other
              resources or reach out to the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/how-it-works">
                <Button variant="outline">How It Works</Button>
              </Link>
              <a
                href="https://github.com/wahibonae/onefile/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">GitHub Issues</Button>
              </a>
              <Link href="/about">
                <Button variant="outline">About OneFile</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Ready to Try OneFile?</h2>
            <p className="text-muted-foreground mb-6">
              Combine unlimited files and bypass AI upload limits in seconds.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Start Combining Files - Free
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
