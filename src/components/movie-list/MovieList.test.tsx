import { render, screen } from "@testing-library/react";
import MovieList, { type MovieListProps } from "./MovieList";
import { describe, it, expect } from "vitest";
import type { Movie } from "../../types/movie";
import { BrowserRouter } from "react-router-dom";

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Star Wars",
    poster: "star.jpg",
    backdrop: "backdrop.jpg",
    imdb_rating: 8.5,
    released_on: "1977-05-25",
    length: "121 min",
    overview: "Epic space opera.",
    slug: "star-wars",
    cast: ["Mark Hamill", "Carrie Fisher"],
    director: "George Lucas",
    genres: ["Action", "Sci-Fi"],
    classification: "18+",
  },
  {
    id: "2",
    title: "Empire Strikes Back",
    poster: "empire.jpg",
    backdrop: "backdrop2.jpg",
    imdb_rating: 8.7,
    released_on: "1980-05-21",
    length: "124 min",
    overview: "Darker sequel.",
    slug: "empire-strikes-back",
    cast: ["Mark Hamill", "Harrison Ford"],
    director: "Irvin Kershner",
    genres: ["Action", "Adventure"],
    classification: "18+",
  },
];

const renderComponent = (props: MovieListProps) => {
  render(
    <BrowserRouter>
      <MovieList {...props} />
    </BrowserRouter>
  );
};

describe("<MovieList />", () => {
  it("renders one carousel per unique genre", () => {
    renderComponent({ movies: mockMovies });
    const carousels = screen.getAllByTestId("movie-carousel");
    expect(carousels).toHaveLength(3);
  });
});
