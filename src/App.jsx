import  Home  from "./pages/Home"
import { BrowserRouter, Route, Routes } from "react-router"
import SingleMovie from "./components/SingleMovie"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MovieSearch from "./components/MovieSearch"


const App = () => {
  return (
 <BrowserRouter>
 <Navbar />
 <Routes>
  <Route path="/" element={ <Home/>}/>
  <Route path='/movie/:id' element={<SingleMovie/>} />
  <Route path="/search" element={<MovieSearch />} />
 </Routes>
 <Footer/>
 </BrowserRouter>
  )
}

export default App
