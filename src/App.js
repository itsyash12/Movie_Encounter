import './App.css';
import Navbar from './Components/navbar.compenet';
import Banner from './Components/banner.component';
import TrendingMovies from './Components/TrendingMovies.component';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Fav from './Components/fav';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import MovieContextProvider from './Context/MovieContext';

function App() {


  return (
    <MovieContextProvider>
    <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path="/" element={<><Banner/><TrendingMovies/></>}/>
        <Route path="/favourites" element={<Fav/>}></Route>
      </Routes>
    
    </BrowserRouter>
    </MovieContextProvider>
  );
}

export default App;
