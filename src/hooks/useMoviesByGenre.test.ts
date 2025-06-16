import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useMovieByGenre } from "./useMoviesByGenre";
import type { Movie } from "../types/movie";

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Star Wars",
    poster: "star.jpg",
    backdrop: "backdrop.jpg",
    imdb_rating: 8.5,
    released_on: "1977-05-25",
    length: "121 min",
    overview: "Epic space opera.",
    slug: "star-wars",
    cast: ["Mark Hamill", "Carrie Fisher"],
    director: "George Lucas",
    genres: ["Action", "Sci-Fi"],
    classification: "18+",
  },
  {
    id: "2",
    title: "Empire Strikes Back",
    poster: "empire.jpg",
    backdrop: "backdrop2.jpg",
    imdb_rating: 8.7,
    released_on: "1980-05-21",
    length: "124 min",
    overview: "Darker sequel.",
    slug: "empire-strikes-back",
    cast: ["Mark Hamill", "Harrison Ford"],
    director: "Irvin Kershner",
    genres: ["Action", "Adventure"],
    classification: "18+",
  },
];

describe("useMovieByGenre", () => {
  it("groups movies by unique genres", () => {
    const { result } = renderHook(() => useMovieByGenre(mockMovies));

    const genreEntries = result.current;
    const expectedGenres = new Set(mockMovies.flatMap((m) => m.genres));
    expect(genreEntries).toHaveLength(expectedGenres.size);

    expectedGenres.forEach((g) => {
      const entry = genreEntries.find((e) => e.genre === g);
      expect(entry).toBeDefined();
      // every movie with that genre should be inside the list
      const moviesWithGenre = mockMovies.filter((m) => m.genres.includes(g));
      expect(entry!.list).toEqual(moviesWithGenre);
    });
  });

  it("returns memoised value when movies array reference is unchanged", () => {
    const { result, rerender } = renderHook(
      ({ data }) => useMovieByGenre(data),
      { initialProps: { data: mockMovies } }
    );

    const firstRef = result.current;
    rerender({ data: mockMovies });

    expect(result.current).toBe(firstRef);
  });

  it("recomputes when movies array reference changes", () => {
    const { result, rerender } = renderHook(
      ({ data }) => useMovieByGenre(data),
      { initialProps: { data: mockMovies } }
    );
    const firstRef = result.current;
    const newMovies = [...mockMovies];
    rerender({ data: newMovies });

    expect(result.current).not.toBe(firstRef);
    expect(result.current.some((e) => e.genre === "Adventure")).toBe(true);
  });
});
