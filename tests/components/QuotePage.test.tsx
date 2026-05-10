import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QuotePage } from "../../src/components/QuotePage";

const mockQuote = {
  id: "abc-123",
  date: "2026-05-10",
  quote_text: "The happiness of your life depends upon the quality of your thoughts.",
  attribution: "Marcus Aurelius, Meditations V.16",
  reflection: "What will you give your attention to today?",
  virtue: "wisdom" as const,
  created_at: "2026-05-10T00:00:00Z",
};

describe("QuotePage", () => {
  it("renders the quote text", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/quality of your thoughts/)).toBeInTheDocument();
  });

  it("renders the attribution", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/Marcus Aurelius/)).toBeInTheDocument();
  });

  it("renders the reflection prompt", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/attention to today/)).toBeInTheDocument();
  });

  it("renders the virtue label", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText("Wisdom")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<QuotePage quote={mockQuote} />);
    expect(screen.getByText(/13 Guys Named Ed/)).toBeInTheDocument();
  });
});
