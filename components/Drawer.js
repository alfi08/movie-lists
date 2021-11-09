import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Input from "./Input";
import Title from "./Title";
import List from "./List";
import MovieListDropdown from "./MoviesListDropdown";
import Loader from "./Loader";

const Drawer = ({ isOpen, setIsOpen }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const { title, updateTitle, movies, findMovie, loading, errorMessage } =
    useAppContext();

  return (
    <div
      className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-80 inset-0 transform ease-in-out ${
        isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 opacity-0 translate-x-full"
      }`}
    >
      {/* drawer content */}
      <div
        className={`w-screen max-w-3xl lg:max-w-lg right-0 absolute px-7 bg-white h-full shadow-xl delay-300 duration-500  ease-in-out transition-all transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="my-6">
          <Title>Judul Konten</Title>
          <Input
            value={title}
            placeholder="cth: 10 film komedi"
            onChange={updateTitle}
          />
        </div>

        <div className="my-6">
          <Title>Tambah Film</Title>
          <div className="flex gap-x-2">
            <Input
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              placeholder="cth: Dune"
            />
            <button
              className="disabled:opacity-50 disabled:cursor-not-allowed px-4 rounded-md border border-dark-background ease-in-out duration-300  hover:bg-gray-600 hover:text-white "
              onClick={findMovie(movieTitle)}
              disabled={!movieTitle.length}
            >
              {loading ? <Loader /> : "cari"}
            </button>
          </div>
          <div className="text-md text-gray-500 mt-4 pl-2">{errorMessage}</div>
          <MovieListDropdown />
        </div>

        <div className="my-6">
          <Title>Daftar Film</Title>
          <div className="movies">
            {movies.map((movie) => (
              <List key={movie.id} movie={movie} type="delete" />
            ))}
            {!movies.length && <div className="text-center text-gray-500">Daftar film masih kosong!</div>}
          </div>
        </div>
      </div>

      {/* drawer backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="w-screen h-full cursor-pointer"
      ></div>
    </div>
  );
};

export default Drawer;
