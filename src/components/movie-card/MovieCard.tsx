import { useRef } from "react";
import type { Movie } from "../../types/movie";
import WookieImage from "../../ui/image/Image";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { SCROLL_KEY } from "../../hooks/useScrollRestoration";

export interface MovieCardProps {
  movie: Movie;
  genre: string;
}
export default function MovieCard(props: MovieCardProps) {
  const { movie, genre } = props;
  const movieCardRef = useRef<HTMLAnchorElement>(null);
  const isVisible = useIntersectionObserver(movieCardRef);
  const dataSlug = `${genre}-${movie.slug}`;
  // storing the slug in session storage for scroll restoration (we are using the element instead of scroll offset due to loading shimmer for home page causing inconsistent scroll behaviour)
  const handleLinkClick = () => {
    sessionStorage.setItem(SCROLL_KEY, dataSlug);
  };
  return (
    <Link
      to={`/movie/${movie.slug}`}
      ref={movieCardRef}
      onClick={handleLinkClick}
      data-slug={dataSlug}
    >
      <div
        className={`bg-white flex flex-col justify-around rounded-xl min-h-32 cursor-pointer w-[342px] h-[513px]`}
      >
        {isVisible && (
          <WookieImage
            src={movie.poster}
            className="rounded-xl"
            alt={movie.title}
          />
        )}
      </div>
    </Link>
  );
}
