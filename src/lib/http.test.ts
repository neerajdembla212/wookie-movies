import { describe, it, expect, vi, beforeEach } from "vitest";
import { http } from "./http";

const originalEnv = import.meta.env;

describe("http.get()", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.resetModules();

    (import.meta as any).env = {
      ...originalEnv,
      VITE_WOOKIE_API_KEY: "Bearer TEST_API_KEY",
    };
  });

  it("calls fetch with correct headers and method", async () => {
    const mockResponse = { movies: ["Movie1"] };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await http.get("movies");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://wookie.codesubmit.io/movies",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("throws error with status code and message if response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        text: () => Promise.resolve("Forbidden"),
      })
    );

    await expect(http.get("movies")).rejects.toThrow(
      "Api error: 403 Forbidden"
    );
  });
});
