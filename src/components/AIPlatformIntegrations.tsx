import { Button } from "@/components/ui/button";
import {
  Claude,
  ChatGPT,
  Gemini,
  DeepSeek,
  Grok,
  Perplexity,
} from "@/components/logos";
import Link from "next/link";

export function AIPlatformIntegrations() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="space-y-6 text-center">
          <h2 className="text-foreground text-2xl font-semibold">
            Works with your favorite AI platforms
          </h2>
          <div className="*:bg-foreground/5 mx-auto flex max-w-xl flex-wrap justify-center gap-0.5 *:rounded *:p-6 *:first:rounded-l-xl *:last:rounded-r-xl">
            <div>
              <Claude className="m-auto size-8" />
            </div>
            <div>
              <ChatGPT className="m-auto size-8" />
            </div>
            <div>
              <Gemini className="m-auto size-8" />
            </div>
            <div>
              <DeepSeek className="m-auto size-8" />
            </div>
            <div>
              <Grok className="m-auto size-8" />
            </div>
            <div>
              <Perplexity className="m-auto size-8" />
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="#">View All Supported Platforms</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
