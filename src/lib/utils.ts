import type { Movie } from "../types/movie";

export const hasRating = (movie: Movie) => {
  return !isNaN(movie.imdb_rating);
};

export const formatRating = (rating: number) => rating.toFixed(1);

export const getYear = (dateString: string) => {
  const date = new Date(dateString);
  if(isNaN(date.getTime())) {
    return;
  }
  return date.getFullYear();
}
