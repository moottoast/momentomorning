import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VirtueLabel } from "../../src/components/VirtueLabel";

describe("VirtueLabel", () => {
  it("renders the virtue name in uppercase", () => {
    render(<VirtueLabel virtue="wisdom" />);
    expect(screen.getByText("Wisdom")).toBeInTheDocument();
  });

  it("renders the correct icon for each virtue", () => {
    const { container: w } = render(<VirtueLabel virtue="wisdom" />);
    expect(w.querySelector("svg")).toBeInTheDocument();

    const { container: c } = render(<VirtueLabel virtue="courage" />);
    expect(c.querySelector("svg")).toBeInTheDocument();

    const { container: j } = render(<VirtueLabel virtue="justice" />);
    expect(j.querySelector("svg")).toBeInTheDocument();

    const { container: t } = render(<VirtueLabel virtue="temperance" />);
    expect(t.querySelector("svg")).toBeInTheDocument();
  });
});
