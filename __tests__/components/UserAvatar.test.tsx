import React from "react";
import { render, screen } from "@testing-library/react";
import UserAvatar from "@/components/UserAvatar";

describe("UserAvatar Component", () => {
  const mockUser = {
    id: "1",
    name: "John Doe",
    image: "https://example.com/avatar.jpg",
  };

  it("renders user avatar with image", () => {
    render(<UserAvatar user={mockUser} />);
    const img = screen.getByRole("img", { name: /john doe/i });
    expect(img).toHaveAttribute("src", expect.stringContaining("avatar.jpg"));
  });

  it("renders initials when no image is provided", () => {
    const userWithoutImage = { ...mockUser, image: undefined };
    render(<UserAvatar user={userWithoutImage} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders question mark when no name is provided", () => {
    const userWithoutName = { id: "2" };
    render(<UserAvatar user={userWithoutName} />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("applies correct size class", () => {
    render(<UserAvatar user={mockUser} size="lg" />);
    const avatar = screen.getByRole("img", { name: /john doe/i }).parentElement;
    expect(avatar).toHaveClass("w-10 h-10");
  });

  it("shows name when showName is true", () => {
    render(<UserAvatar user={mockUser} showName={true} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders as a link when linkToProfile is true", () => {
    render(<UserAvatar user={mockUser} linkToProfile={true} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/profile/1");
  });

  it("does not render as a link when linkToProfile is false", () => {
    render(<UserAvatar user={mockUser} linkToProfile={false} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
