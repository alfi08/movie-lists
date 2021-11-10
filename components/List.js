import {forwardRef} from "react"
import { useAppContext } from "../context/AppContext";

const List = forwardRef(({ movie, type, draggable, dragHandle }, ref) => {
  const { manipulateMovie } = useAppContext();
  return (
    <div
      className="my-4 flex justify-between items-center bg-white !static"
      ref={ref}
      {...draggable}
      {...dragHandle}
    >
      <div className="text-lg font-medium text-gray-900">
        {movie.original_title} - {movie.release_date.split("-")[0]}
      </div>

      <div
        className="text-lg text-gray-900"
        onClick={manipulateMovie(movie, type)}
      >
        <i
          className={`fas ${
            type === "delete" ? "fa-close" : "fa-add"
          } cursor-pointer`}
        ></i>
      </div>
    </div>
  );
});

export default List;
