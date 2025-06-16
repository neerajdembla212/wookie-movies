import {
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { getWookieMovies } from "../services/wookieApi";
import type { Movie } from "../types/movie";
import MovieList from "../components/movie-list/MovieList";
import { useScrollRestoration } from "../hooks/useScrollRestoration";

export async function homeLoader({
  request,
}: LoaderFunctionArgs): Promise<Movie[]> {
  
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim();
  let queryParams: Record<string, string | number> = {};
  if (query) {
    queryParams["q"] = query;
  }
  const data = await getWookieMovies(queryParams);
  if (!data) {
    return [];
  }
  return data.movies;
}

export default function HomePage() {
  useScrollRestoration();
  const movies = useLoaderData<Movie[]>();
  return <MovieList movies={movies} />;
}
