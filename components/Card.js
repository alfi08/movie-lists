const Card = ({ movie }) => {
  return (
    <div className="w-48 rounded-md overflow-hidden">
      <img className="w-full h-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
    </div>
  );
};

export default Card;
