import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Pagination from './pagination';
import { ThreeDots } from 'react-loader-spinner'

export default function TrendingMovies() 
{
    const [page, ChangePage] = useState(1);

    function Increase() {
        ChangePage(prevPage => prevPage + 1)
    }

    function Decrease() {
        if (page > 1) {
            ChangePage(prevPage => prevPage - 1);
        }
    }


    const [movies, getMovies] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/trending/all/week?api_key=75fad9cfac3b9809bd8f47fa6494c99c&page=${page}`)
            .then((response) => {
                let data = response.data.results
                getMovies(data);
            })
    }, [page])

    const [hover,setHover] = useState("");

    function Hoverenterfun(id)
    {   
        setHover(id);
    }

    function Hoverleavefun()
    {
        setHover("")
    }

    const[favourites,setFavourite] = useState([]);

    useEffect(()=>{

        let json;
        try {
             json = JSON.parse(localStorage.getItem("favourites") || JSON.stringify([]));
            } 
        catch (error) {
            console.log(error)
        }
        setFavourite(json);
    },[])

    function addFav(movie)
    {
        let newarr = [...favourites,movie]
        setFavourite(newarr);
        localStorage.setItem("favourites",JSON.stringify(newarr));
    }

    function removeFav(movie)
    {
        let newarr = [...favourites];
        newarr = newarr.filter((m)=>{
            return m.id!=movie.id;
        })
        setFavourite(newarr);
        localStorage.setItem("favourites",JSON.stringify(newarr));
    }


    return (
        <React.Fragment>
            <div className='text-2xl md:text-4xl text-center font-bold mt-3 md:mt-4'>Trending Movies</div>

            {
            (movies.length==0) ?
                
                <div className='flex justify-center'>
                    <ThreeDots 
                    width="50"
                    color='grey'
                    ariaLabel='loading'
                    /> 
                </div>
                           :
                <React.Fragment>
                <div className='flex flex-wrap justify-center'>

                    {
                        movies.map(
                            (movie) => (
                                <div key={movie.id} onMouseEnter={()=>Hoverenterfun(movie.id)} onMouseLeave={Hoverleavefun} className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[20vh] md:h-[30vh] w-[120px] md:w-[180px] rounded-xl justify-end bg-center bg-cover flex flex-col items-center m-3 hover:scale-110 duration-300`}>
                                    <div className='w-full 
                                    bg-slate-800 text-white md:py-2 text-xs text-center rounded-b-xlfont-bold'>
                                    {(movie.title == undefined) ? movie.name : movie.title}</div>
                                    { hover==movie.id && 
                                    <>
                                    {
                                    favourites.find((m)=> m.id==movie.id) ? <button className='text-xl items-start flex'onClick={()=>removeFav(movie)}>❤️</button> : <button className='text-xl items-start flex hover:scale-110 'onClick={()=>addFav(movie)} >🤍</button> 
                                    }
                                    </>
                                    } 
                                </div>
                            ))
                    }
                </div>
                 <Pagination Decrease={Decrease} Increase={Increase} page={page}></Pagination>
                 </React.Fragment>
                }
        
        </React.Fragment>
    )
 }
