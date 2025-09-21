import axios from "axios";

const fetchMovie = async () => {
  const queries = [
      "avengers",
      "iron man",
    "batman",
    "mission impossible",
    "superman",
    "harry potter",
    "spiderman",
    "thor",
    "hulk",
    "matrix",
    "joker",
    "wonder woman",
  ];


  const requests = queries.map((q) =>
    axios.get(`http://www.omdbapi.com/?s=${q}&apikey=8099f99c&type=movie&page=1`)
  );

  const responses = await Promise.all(requests);

  
  const movies = responses
    .map((res) => (res.data && res.data.Response === "True" ? res.data.Search : []))
    .flat()

  return movies
};


const singleMovie = async(id)=>{
    const response = await axios.get(`http://www.omdbapi.com/?t=${id}&apikey=8099f99c`)
    
    return response.data
    
}


export const searchMovie = async(query)=>{
  const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=8099f99c`)
  console.log(response.data);
  return response.data
  

}
export const movieService = { fetchMovie , singleMovie  }
