import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReplyButton from "@/components/ReplyButton";

describe("ReplyButton Component", () => {
  it("renders reply button", () => {
    const mockOnClick = jest.fn();
    render(<ReplyButton onClick={mockOnClick} />);
    const button = screen.getByRole("button", { name: /reply/i });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const mockOnClick = jest.fn();
    render(<ReplyButton onClick={mockOnClick} />);
    const button = screen.getByRole("button", { name: /reply/i });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
