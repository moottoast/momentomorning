import type { Quote } from "../types/quote";
import { VirtueLabel } from "./VirtueLabel";
import { Footer } from "./Footer";

export function QuotePage({ quote }: { quote: Quote }) {
  return (
    <div className="min-h-screen bg-bg font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <VirtueLabel virtue={quote.virtue} />

        <blockquote className="text-[1.75rem] leading-[1.7] font-light max-w-[600px] text-primary tracking-tight sm:text-[1.35rem] sm:leading-[1.65]">
          "{quote.quote_text}"
        </blockquote>

        <p className="text-sm text-secondary mt-8 tracking-wide">
          {quote.attribution}
        </p>

        <p className="text-[0.95rem] text-reflection mt-12 font-light tracking-wide">
          {quote.reflection}
        </p>
      </main>

      <Footer />
    </div>
  );
}
