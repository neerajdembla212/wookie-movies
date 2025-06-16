import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { MovieCarousel, type MovieCarouselProps } from "./MovieCarousel";


vi.mock("../../hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: () => true,
}));


export const mockGenreMap: MovieCarouselProps = {
  title: "Action",
  movies: [
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
  ],
};

const renderComponent = (props: MovieCarouselProps) =>
  render(
    <BrowserRouter>
      <MovieCarousel {...props} />
    </BrowserRouter>
  );

describe("<MovieCarousel />", () => {
  it("renders heading with title", () => {
    renderComponent(mockGenreMap);
    expect(
      screen.getByRole("heading", { level: 3, name: "Action" })
    ).toBeInTheDocument();
  });

  it("renders one MovieCard poster per movie", () => {
    renderComponent(mockGenreMap);
     const images = screen.getAllByRole("img");
    expect(images).toHaveLength(Object.values(mockGenreMap).length);
    expect(images[0]).toHaveAttribute("src", "star.jpg");
    expect(images[1]).toHaveAttribute("src", "empire.jpg");
  });
});
