import React from "react";
import { render, screen } from "@testing-library/react";
import Tag from "@/components/Tag";

describe("Tag Component", () => {
  it("renders tag with correct name", () => {
    render(<Tag name="JavaScript" />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("has correct link to tag page", () => {
    render(<Tag name="Python" />);
    const link = screen.getByRole("link", { name: /python/i });
    expect(link).toHaveAttribute("href", "/tag/Python");
  });
});
