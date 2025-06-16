import { useMovieByGenre } from "../../hooks/useMoviesByGenre";
import type { Movie } from "../../types/movie";
import { MovieCarousel } from "../movie-carousel/MovieCarousel";

export interface MovieListProps {
  movies: Movie[];
}
export default function MovieList(props: MovieListProps) {
  const { movies } = props;

  const moviesByGenre = useMovieByGenre(movies);
  return (
    <div className="space-y-8">
      {moviesByGenre.map(({ genre, list }) => (
        <MovieCarousel key={genre} title={genre} movies={list} />
      ))}
    </div>
  );
}
