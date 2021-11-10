import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Input from "./Input";
import Title from "./Title";
import List from "./List";
import MovieListDropdown from "./MoviesListDropdown";
import Loader from "./Loader";

const Drawer = ({ isOpen, setIsOpen }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const {
    title,
    updateTitle,
    movies,
    updateMovies,
    findMovie,
    loading,
    errorMessage,
  } = useAppContext();

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(movies);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    updateMovies(items);
  };

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
        className={`w-screen overflow-y-scroll max-w-3xl lg:max-w-lg right-0 absolute px-7 bg-white h-full shadow-xl delay-300 duration-500  ease-in-out transition-all transform ${
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

        <div className="my-6 h-full w-full">
          <Title>Daftar Film</Title>
          <div className="movies px-4 h-full w-full">
            {movies.length ? (
              // drag and drop
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="movies">
                  {(provided) => (
                    <div className="h-full w-full" {...provided.droppableProps} ref={provided.innerRef}>
                      {movies.map((movie, index) => (
                        <Draggable
                          key={movie.id}
                          draggableId={"" + movie.id}
                          index={index}
                        >
                          {(provide) => (
                            <List
                              movie={movie}
                              type="delete"
                              ref={provide.innerRef}
                              draggable={provide.draggableProps}
                              dragHandle={provide.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-gray-500">
                Daftar film masih kosong!
              </div>
            )}
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
