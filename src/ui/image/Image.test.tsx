import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import WookieImage from "./Image";

vi.mock("../../assets/fallbackImage.png", () => ({
  default: "fallback-image.png",
}));

describe("<Image />", () => {
  it("Displays loading state correctly", async () => {
    render(<WookieImage src="test.jpg" alt="Test Image" />);
    const img = screen.getByAltText("Test Image") as HTMLImageElement;
    // opacity is 0 during loading
    expect(img).toHaveClass("opacity-0");

    img.dispatchEvent(new Event("load"));

    await waitFor(() => {
      expect(img).toHaveClass("opacity-100");
    });
  });

  it("falls back to the fallback image on error", async () => {
    render(<WookieImage src="broken.jpg" alt="Broken Image" />);
    const img = screen.getByAltText("Broken Image") as HTMLImageElement;

    img.dispatchEvent(new Event("error"));

    await waitFor(() => {
      expect(img.src).toContain("fallback-image.png");
    });
  });

  it("applies custom className", () => {
    render(
      <WookieImage src="test.jpg" alt="Styled Image" className="rounded-xl" />
    );
    const img = screen.getByAltText("Styled Image");
    expect(img).toHaveClass("rounded-xl");
  });
});
