import type { Movie } from "../../types/movie";
import MovieCard from "../movie-card/MovieCard";

export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}
export function MovieCarousel(props: MovieCarouselProps) {
  const { title, movies } = props;
  return (
    <section className="mb-4" data-testid="movie-carousel">
      <h3 className="font-bold text-2xl mb-2">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genre={title}/>
        ))}
      </div>
    </section>
  );
}
