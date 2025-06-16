import { Link } from "react-router-dom";
import SearchBar from "../../ui/image/search-bar/SearchBar";

export default function Header() {
  return (
    <header className="flex bg-white shadow-md justify-between items-center fixed w-dvw z-20">
      <Link to="/" className="p-4 text-2xl">
        Wookie Movies
      </Link>
      <SearchBar />
    </header>
  );
}
