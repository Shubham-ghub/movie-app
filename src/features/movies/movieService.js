import axios from "axios";

const fetchMovie = async () => {
  
  const response = await axios.get("https://api.imdbapi.dev/titles")
  return response.data.titles
};


const singleMovie = async(id)=>{
    const response = await axios.get(`http://www.omdbapi.com/?t=${id}&apikey=8099f99c`)
    return response.data
    
}


export const searchMovie = async(query)=>{
  const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=8099f99c`)
  return response.data
  

}



export const movieService = { fetchMovie , singleMovie  }
