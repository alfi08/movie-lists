import { useAppContext } from "../context/AppContext";
import List from "./List";

const MovieListDropdown = () => {
  const { movieList } = useAppContext();

  return (
    !!movieList.length && (
      <div className="border border-gray-900 mt-3 rounded-md px-4 max-h-48 overflow-x-scroll">
        {movieList.map((movie) => (
          <List key={movie.id} movie={movie} />
        ))}
      </div>
    )
  );
};

export default MovieListDropdown;
