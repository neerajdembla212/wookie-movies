import { render, screen } from "@testing-library/react";
import MovieCard, { type MovieCardProps } from "./MovieCard";
import type { Movie } from "../../types/movie";
import { vi, describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";


vi.mock("../../hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: () => true,
}));

const renderComponent = (props: MovieCardProps) => {
  render(
    <BrowserRouter>
      <MovieCard {...props} />
    </BrowserRouter>
  );
};


describe("<MovieCard />", () => {
  const mockMovie: Movie = {
    id: "42",
    title: "Return of the Jedi",
    poster: "return.jpg",
    backdrop: "bg.jpg",
    imdb_rating: 8.3,
    released_on: "1983-05-25",
    length: "131 min",
    overview: "Final chapter.",
    slug: "return-of-the-jedi",
    cast: ["Luke", "Leia", "Han"],
    director: "Richard Marquand",
    genres: ["Adventure"],
    classification: "18+",
  };

  it("renders the movie poster via WookieImage", () => {
    renderComponent({ movie: mockMovie });
    const image = screen.getByAltText("Return of the Jedi") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("return.jpg");
  });
});
