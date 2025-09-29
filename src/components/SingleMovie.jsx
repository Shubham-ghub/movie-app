import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleMovie } from '../features/movies/movieSlice';
import { ArrowBigLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import Loader from './Loader';

const SingleMovie = () => {
 
    const { movie, isLoading, isError, message } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
 
  const {id} = useParams()
  
  useEffect(() => {
    dispatch(getSingleMovie(id));
    console.log(id);
    
  }, [dispatch]);

  if(isLoading) return <Loader/>
  
 

    return (
   
    <div
     className= " bg-black h-1/2 text-white flex justify-center px-10 py-10 " >
        <Link to={"/"} className=' flex justify-center h-5  items-center relative top-0 right-20'> <ArrowBigLeft className='text-blue-500 '/> </Link>
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Movie Poster + Info */}
        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={movie.Poster}
              alt={movie.Title}
              key={movie.ImdbID}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-6 space-y-4">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <p className="text-gray-400">
              {movie.Year}  • {movie.Genre}
            </p>
            <p className="italic text-gray-300">Directed by {movie.Director}</p>
            <p className="text-sm text-gray-300">Actors: {movie.Actors}</p>
            <p className="mt-2">{movie.Plot}</p>

            {/* Rating */}
            <div className="flex items-center mt-4">
              <span className="text-yellow-400 text-xl font-bold">
                ⭐ {movie.imdbRating}
              </span>
              <span className="ml-2 text-gray-400">IMDb Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default SingleMovie
