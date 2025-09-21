import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import  {searchMovie}  from "../features/movies/movieService";
import { Link } from "react-router-dom";
const MovieSearch = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const data = await searchMovie(query);
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="px-12 py-10  w-full min-h-screen bg-gray-900 text-white flex justify-center flex-col ">
      <h2 className="text-2xl mb-4 ">Results for : {query}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-2 rounded shadow">
            <Link to={`/movie/${movie.Title}`}  >
            
            <img src={movie.Poster} alt={movie.Title}  className="w-full h-80 object-cover" />
            </Link>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
