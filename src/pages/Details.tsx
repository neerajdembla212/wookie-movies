import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { getWookieMovieDetails } from "../services/wookieApi";
import type { Movie } from "../types/movie";
import MovieDetails from "../components/movie-details/MovieDetails";

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Bad Request", { status: 400 });
  }
  return await getWookieMovieDetails(slug);
}

export default function Details() {
  const movie = useLoaderData<Movie>();
  return <MovieDetails movie={movie} />;
}
