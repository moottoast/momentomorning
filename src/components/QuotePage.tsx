import type { Quote } from "../types/quote";
import { VirtueLabel } from "./VirtueLabel";
import { Footer } from "./Footer";

function formatQuoteDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function QuotePage({ quote }: { quote: Quote }) {
  const quoteDate = formatQuoteDate(quote.date);

  return (
    <div className="min-h-screen bg-bg font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        {quoteDate && (
          <time
            dateTime={quote.date}
            className="mb-7 text-[0.68rem] uppercase tracking-[0.26em] text-secondary/80"
          >
            Today / {quoteDate}
          </time>
        )}

        <VirtueLabel virtue={quote.virtue} />

        <blockquote className="text-[1.35rem] leading-[1.65] sm:text-[1.75rem] sm:leading-[1.7] font-light max-w-[600px] text-primary tracking-tight">
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
