import Image from "next/image";
import { X, Check } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
        Why OneFile Solves AI Upload Limits
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-[4/3] relative">
              <Image
                src="/before.webp"
                alt="ChatGPT file upload limit error - You've reached your file upload limit, Upgrade to Plus"
                fill
                className="object-cover dark:brightness-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>

            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                <X className="h-4 w-4" />
                Without OneFile
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm">
            Frustrated by file upload limits on AI platforms
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-[4/3] relative">
              <Image
                src="/after.webp"
                alt="OneFile success - your-onefile.txt ready to upload with unlimited files combined"
                fill
                className="object-cover dark:brightness-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>

            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                <Check className="h-4 w-4" />
                With OneFile
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm">
            Upload unlimited files in one go - no restrictions
          </p>
        </div>
      </div>
    </section>
  );
}
