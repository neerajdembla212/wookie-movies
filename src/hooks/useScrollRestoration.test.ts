import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { useScrollRestoration, SCROLL_KEY } from "./useScrollRestoration";

let mockPath = "/";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ pathname: mockPath }),
  };
});

function addCard(slug: string) {
  const div = document.createElement("div");
  div.dataset.slug = slug;
  document.body.appendChild(div);
  return div;
}

describe("useScrollRestoration", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });
  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal("scrollTo", vi.fn());
  });

  it('restores scroll when visiting "/"', () => {
    const el = addCard("sci-fi-spiderman");
    sessionStorage.setItem(SCROLL_KEY, "sci-fi-spiderman");
    const scrollIntoViewSpy = vi.spyOn(el, "scrollIntoView");

    renderHook(() => useScrollRestoration());

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: "instant",
      block: "center",
    });
  });

  it("does nothing if the saved slug is missing in the DOM", () => {
    const el = addCard("sci-fi-spiderman");
    sessionStorage.setItem(SCROLL_KEY, "non-existent");
    const scrollIntoViewSpy = vi.spyOn(el, "scrollIntoView");

    renderHook(() => useScrollRestoration());

    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(SCROLL_KEY)).toBe("non-existent");
  });
});
