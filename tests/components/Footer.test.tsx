import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../../src/components/Footer";

describe("Footer", () => {
  it("renders the project name", () => {
    render(<Footer />);
    expect(screen.getByText(/Memento Morning/)).toBeInTheDocument();
  });

  it("renders the creator credit", () => {
    render(<Footer />);
    expect(screen.getByText(/13 Guys Named Ed/)).toBeInTheDocument();
  });

  it("mentions Clearwater, Florida", () => {
    render(<Footer />);
    expect(screen.getByText(/Clearwater, Florida/)).toBeInTheDocument();
  });
});
