import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [title, setTitle] = useState("10 film sadis terbaik!");
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const manipulateMovie = (movie, type) => (e) => {
    e.preventDefault();
    if (type === "delete") {
      const updatedMovies = movies.filter((m) => m.id !== movie.id);
      setMovies(updatedMovies);
    } else {
      setMovies([...movies, movie]);
    }
  };

  const findMovie = (title) => async (e) => {
    e.preventDefault();
    let base_url = process.env.NEXT_PUBLIC_BASE_URL;
    let api_key = process.env.NEXT_PUBLIC_API_KEY;

    setLoading(true);
    const response = await fetch(
      `${base_url}/search/movie?api_key=${api_key}&query=${title}`
    );

    const data = await response.json();
    if (data.results.length) {
      setMovieList(data.results);
      setErrorMessage(null);
    } else {
      setMovieList([]);
      setErrorMessage("film tidak ditemukan");
    }

    setLoading(false);
  };

  let state = {
    title,
    movies,
    movieList,
    loading,
    errorMessage,
    updateTitle,
    manipulateMovie,
    findMovie,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
