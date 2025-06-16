import type { Movie } from "../types/movie";
import { useMemo } from "react";

export const useMovieByGenre = (movies: Movie[]) => {
  return useMemo(() => {
    const genreMap = new Map<string, Movie[]>();

    movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        genreMap.set(genre, [...(genreMap.get(genre) ?? []), movie]);
      });
    });
    return Array.from(genreMap, ([genre, list]) => ({ genre, list }));
  }, [movies]);
};
