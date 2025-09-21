import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheMovie } from "../features/movies/movieSlice";
import { Link} from "react-router";
import Loader from "./Loader";

const Hero = () => {




  const { allMovies, isLoading, isError, message } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();

 
 
  useEffect(() => {
    dispatch(fetchTheMovie());
  }, [dispatch]);


  
  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <div className="text-red-500 text-2xl">Error: {message}</div>;
  }
  

  

  return (
    <div className="px-12 py-10  w-full min-h-screen bg-gray-900 text-white flex justify-center">
      
      
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center"> All Movies</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
        
          allMovies.map((movie) => (
           <Link key={movie.id} to={`/movie/${movie.Title}`}>
            <div  className="bg-gray-800 rounded-2xl">
           <img
           src={movie.Poster}
           alt={movie.Title}
           className="w-full h-80 object-cover"
           />
           <div className="p-4">
           <h2 className="text-xl font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
           </div>
         </div> </Link>
         ))
          }
        </div>
      </div>
    </div>
  );
};

export default Hero;
