import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheMovie } from "../features/movies/movieSlice";
import { Link } from "react-router";
import Loader from "./Loader";



const Hero = () => {
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const { allMovies, isLoading, isError, message } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTheMovie());
  }, [dispatch]);
 
 
  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500 text-2xl">Error: {message}</div>;

  // Build genre list
  const genres = ["All Genres"];
  if (allMovies && allMovies.length > 0) {
    const uniqueGenres = [
      ...new Set(
        allMovies.flatMap((movie) =>
          movie.genres
            ? movie.genres.map((genre) =>
                typeof genre === "string"
                  ? genre
                  : genre.text || genre.name || genre
              )
            : []
        )
      ),
    ];
    genres.push(...uniqueGenres.sort());
  }

  // Filter movies
  const filteredMovies =
    selectedGenre === "All Genres"
      ? allMovies
      : allMovies.filter((movie) =>
          movie.genres &&
          movie.genres.some((genre) => {
            const genreName =
              typeof genre === "string"
                ? genre
                : genre.text || genre.name || genre;
            return genreName
              .toLowerCase()
              .includes(selectedGenre.toLowerCase());
          })
        );




  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Header Section */}
      <div className="relative py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="relative z-10 text-center px-4">
          {/* Genre Selector */}
          <div className="relative inline-block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              {selectedGenre}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 bg-white text-gray-900 rounded-lg shadow-lg min-w-48 max-h-60 overflow-y-auto z-20">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreSelect(genre)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedGenre === genre ? "bg-blue-100 font-semibold" : ""
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center bg-gray-800 rounded-lg px-6 py-3">
              <span className="text-blue-400 font-bold text-lg mr-2">
                {filteredMovies.length}
              </span>
              <span className="text-gray-300">
                {selectedGenre === "All Genres"
                  ? "Total Movies"
                  : `${selectedGenre} Movies`}
              </span>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => {
               
               console.log(movie?.primaryImage?.url || "https://m.media-amazon.com/images/M/MV5BMjNkZDQzYTItZDgzNi00ZDU4LWI2NWItYjA0ZDdlMjgyMWI2XkEyXkFqcGc@._V1_.jpg");
        

              return (
                <Link
                  key={movie.id}
                  to={`/movie/${movie?.originalTitle}`}
                  className="group block"
                >
                  <div className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    {/* Movie Poster */}
                    <div className="relative">
                      <img
                        src={movie.primaryImage.url}

                        alt={movie.originalTitle || "No title"}
                        loading="lazy"
                        className="w-full h-80  "
                      />

                      {/* Genre Badge */}
                      {movie.genres && movie.genres.length > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                            {typeof movie.genres[0] === "string"
                              ? movie.genres[0]
                              : movie.genres[0].text ||
                                movie.genres[0].name ||
                                "Unknown"}
                          </span>
                        </div>
                      )}

                      {/* Rating Badge */}
                      {movie.ratingsSummary?.aggregateRating && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                            ★ {movie.ratingsSummary.aggregateRating.toFixed(1)}
                          </span>
                        </div>
                      )}
                     
                    </div>

                    {/* Movie Info */}
                    <div className="p-4">
                      <h2 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {movie.originalTitle}
                      </h2>
                      <p className="text-gray-400 text-sm">{movie.startYear}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* No Movies Found */}
          {filteredMovies.length === 0 && selectedGenre !== "All Genres" && (
            <div className="text-center py-12">
              <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-2">No Movies Found</h3>
                <p className="text-gray-400 mb-4">
                  No movies found in the "{selectedGenre}" genre.
                </p>
                <button
                  onClick={() => handleGenreSelect("All Genres")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Show All Movies
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
