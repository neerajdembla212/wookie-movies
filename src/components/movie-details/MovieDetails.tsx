import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import WookieImage from "../../ui/image/Image";
import MovieInformation from "./Information";

export interface MovieDetailsProps {
  movie: Movie;
}
export default function MovieDetails(props: MovieDetailsProps) {
  const { movie } = props;

  return (
    <main className="flex gap-4 w-full h-full md:flex-row flex-col overflow-hidden">
      <div className="w-full h-full max-h-[1080px] max-w-[1920px]">
        <WookieImage src={movie.backdrop} alt={movie.title} />
      </div>
      <div>
        <MovieInformation movie={movie} />
        <Link to="/" className="mt-4 inline-block bg-blue-500 text-amber-50 p-4 rounded-xl text-xl">Back to gallery</Link>
      </div>
    </main>
  );
}
