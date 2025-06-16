import { hasRating, formatRating, getYear } from "../../lib/utils";
import type { Movie } from "../../types/movie";

export interface MovieInformationProps {
  movie: Movie;
}

// this function uses unicode chars to display stars, other alternatives could be images, svg, icon fonts, etc.
function renderStars(rating: number) {
  const filled = Math.round(rating / 2);
  return (
    <div className="text-yellow-400 text-xl">
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </div>
  );
}

export default function MovieInformation(props: MovieInformationProps) {
  const { movie } = props;
  return (
    <div className="flex-1 flex-col gap-4 space-y-4">
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="font-bold text-xl">{movie.title} </h1>
          {hasRating(movie) && (
            <p className="ml-2 text-xl">({formatRating(movie.imdb_rating)})</p>
          )}
        </div>
        {renderStars(movie.imdb_rating)}
      </div>
      <div className="text-xl">
        {getYear(movie.released_on)} | {movie.length} | {movie.director}
      </div>
      <div className="flex flex-wrap text-xl">{movie.cast.join(", ")}</div>
      
      <p className="text-xl text-justify">{movie.overview}</p>
    </div>
  );
}
