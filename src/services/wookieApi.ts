import { http } from "../lib/http";
import type { Movie } from "../types/movie";

export async function getWookieMovies(
  queryParmas?: Record<string, string | number>
): Promise<{ movies: Movie[] } | undefined> {
  try {
    return await http.get<{ movies: Movie[] }>("movies", {
      queryParmas,
    });
  } catch (err) {}
}

export async function getWookieMovieDetails(
  slug: string
): Promise<Movie | undefined> {
  try {
    return await http.get<Movie>(`movies/${slug}`);
  } catch (err) {}
}
