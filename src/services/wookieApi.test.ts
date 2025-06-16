import { describe, it, expect, vi, type Mock } from "vitest";
import { getWookieMovies } from "./wookieApi";
import { http } from "../lib/http";

vi.mock("../lib/http", () => ({
  http: {
    get: vi.fn(),
  },
}));

describe("getWookieMovies", () => {
  it("returns movies when request succeeds", async () => {
    const mockMovies = [{ id: "123", title: "Wookie Wars" }];
    (http.get as Mock).mockResolvedValue({ movies: mockMovies });

    const result = await getWookieMovies();

    expect(http.get).toHaveBeenCalledWith("movies", { queryParams: undefined });
    expect(result).toEqual({ movies: mockMovies });
  });

  it("returns undefined when request fails", async () => {
    (http.get as Mock).mockRejectedValue(new Error("API error"));

    const result = await getWookieMovies();

    expect(result).toBeUndefined();
  });
});
