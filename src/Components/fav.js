
import React, { Fragment, useEffect, useState } from 'react'
import Pagination from './pagination';
import { useContext } from 'react';
import { MovieContext } from '../Context/MovieContext';

export default function Fav() {

    const [filteredmovies, setFilterMovies] = useState([])
    const {movies,setMovies} = useContext(MovieContext);

    useEffect(() => {
        let json;
        try {
            json = JSON.parse(localStorage.getItem("favourites") || JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
        let data = json || [];
        setMovies([...data]);
        if (data.length > row) {
            data = data.slice(0, row);
        }
        setFilterMovies([...data])

    }, [])


    function removefn(id) {
        let newarr = filteredmovies.filter((m) => {
            return m.id != id
        })


        let favarr = movies.filter((m) => {
            return m.id != id
        })

        setMovies(favarr);

        let data = JSON.parse(localStorage.getItem("favourites"));
        let locarr = data.filter((m) => {
            return m.id != id
        })

        setFilterMovies([...newarr]);


        localStorage.setItem("favourites", JSON.stringify(locarr));
    }

    let genreids = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }

    const [genres, setGenre] = useState([]);
    useEffect(() => {
        let ar = [];
        movies.map((m) => {
            ar.push(genreids[m.genre_ids[0]] || "Narrative");
        })
        let mset = new Set(ar);
        let narr = [];
        mset.forEach((item) => {
            narr.push(item);
        })
        setGenre(narr);

    }, [movies])

    const [curGenre, setCurGenre] = useState('All Genres');

    function addBg(genre) {
        let filteredarr;
        if (genre == 'All Genres') {
            let json = localStorage.getItem("favourites");
            filteredarr = JSON.parse(json);
        }
        else if (genre == 'Narrative') {
            filteredarr = movies.filter((m) => {
                return genreids[m.genre_ids[0]] == undefined;
            })
        }
        else {
            filteredarr = movies.filter((m) => {
                return genreids[m.genre_ids[0]] == genre;
            })
        }
        setPage(1);
        setCurGenre(genre);

        setFilterMovies(filteredarr.slice(0, row))
        setMovies([...filteredarr]);


    }



    function popincrease() {
        function sortAsc(mov1, mov2) {
            if (mov1.popularity > mov2.popularity) {
                return 1;
            }
            else if (mov1.popularity < mov2.popularity) {
                return -1;
            }
            else {
                return 0;
            }
        }


        let movarr = filteredmovies.sort(sortAsc);
        setFilterMovies([...movarr]);
    }

    function popdecrease() {
        function sortDesc(mov1, mov2) {
            if (mov1.popularity > mov2.popularity) {
                return -1;
            }
            else if (mov1.popularity < mov2.popularity) {
                return 1;
            }
            else {
                return 0;
            }
        }

        let movarr = filteredmovies.sort(sortDesc);
        setFilterMovies([...movarr]);
    }

    function voteincrease() {
        function sortAsc(mov1, mov2) {
            if (mov1.vote_average > mov2.vote_average) {
                return 1;
            }
            else if (mov1.vote_average < mov2.vote_average) {
                return -1;
            }
            else {
                return 0;
            }
        }


        let movarr = filteredmovies.sort(sortAsc);
        setFilterMovies([...movarr]);
    }

    function votedecrease() {
        function sortDesc(mov1, mov2) {
            if (mov1.vote_average > mov2.vote_average) {
                return -1;
            }
            else if (mov1.vote_average < mov2.vote_average) {
                return 1;
            }
            else {
                return 0;
            }
        }

        let movarr = filteredmovies.sort(sortDesc);
        setFilterMovies([...movarr]);
    }

    const [search, setSearch] = useState('');


    function searchFun(e) {
        setSearch(e.target.value);
        let arr = [];
        if (search == "") {
            console.log("in if")
            arr = movies;
        }
        else {
            arr = movies.filter((movie) => {
                return (movie.title || movie.name).includes(search);
            })
            console.log("in else")
        }

        setFilterMovies(arr);
        console.log("filtered movies => ", filteredmovies)
    }

    const [row, setRow] = useState(5);
    const [page, setPage] = useState(1);



    let maxPage;

    maxPage = Math.ceil(movies.length / Number(row));




    function Decrease() {
        if (page > 1) {
            let ei = Number(row) * (page - 1);
            let si = ei - Number(row);
            let arr = [];

            arr = movies.slice(si, ei);

            setFilterMovies([...arr]);

            setPage((prev) => {
                return prev - 1;
            })
        }
    }

    function Increase() {

        if (page < maxPage) {
            let si = Number(row) * (page);
            let ei = si + Number(row);
            let arr = [];

            arr = movies.slice(si, ei);
            setFilterMovies([...arr]);

            setPage((prev) => {
                return prev + 1;
            })
        }
    }
    const [flag, setFlag] = useState(true);

    function changeRowfun(e) {
        if (flag) {
            setRow(e.target.value);
            setFlag(false);
            console.log("in if");
        }
        else {
            console.log("in else");
            setRow(e.target.value);
            console.log(Number(row));
            let arr = movies.slice(0, Number(row));
            setFilterMovies([...arr]);
            console.log(filteredmovies)
            setPage(1);
            setFlag(false);

        }

    }


    return (
        <div>
            <div className="flex justify-center">
                <h1 className='md:text-5xl text-2xl font-semibold'>Favourites</h1>
            </div>



            <div className='flex flex-wrap mt-3 ml-4'>
                {(curGenre == 'All Genres') ? <button className='text-sm md:text-base font-semibold m-2  border-2 rounded-xl p-1 font-medium bg-slate-300' onClick={() => addBg('All Genres')}>All Genres</button> : <button className='text-sm md:text-base font-semibold m-2 border-2 rounded-xl p-1 font-medium hover:bg-slate-300' onClick={() => addBg('All Genres')}>All Genres</button>}
                {
                    genres.map((genre) => (
                        (curGenre == genre) ? <button className='text-sm md:text-base font-semibold m-2 border-2 rounded-xl p-1 font-medium bg-slate-300' onClick={() => addBg(genre)}>{genre}</button> : <button className='text-sm md:text-base font-semibold m-2 border-2 rounded-xl p-1 font-medium hover:bg-slate-300' onClick={() => addBg(genre)} >{genre}</button>
                    ))
                }

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className='flex'>
                    <div className="p-4">
                        <label className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
                            </div>
                            <input type="text" id="table-search" onChange={
                                (e) => { searchFun(e) }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-80 w-40 pl-10 p-2.5  dark:bg-gray-300 dark:border-gray-900 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search movies" />
                        </div>
                    </div>

                    <div className="p-4">
                        <label className="sr-only">Rows</label>
                        <div className="relative mt-1">
                            <input type="number" min={1} max={maxPage}  onChange={(e) => changeRowfun(e)} value={row} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-80 w-40 pl-10 p-2.5  dark:bg-gray-300 dark:border-gray-900 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rows" />
                        </div>
                    </div>
                </div>



                <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400 sm:table hidden">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-300    dark:text-gray-600">
                        <tr>

                            <th scope="col" className="px-6 py-3 text-base">
                                Title
                            </th>
                            <th scope="col" className="px-16 py-3 text-base">
                                <div className='flex-col'>
                                    <button className='ml-10' onClick={popincrease}>⬆️</button>
                                    <div>Popularity</div>
                                    <button className='ml-10' onClick={popdecrease}>⬇️</button>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                                <div className='flex-col'>
                                    <button className='ml-5' onClick={voteincrease}>⬆️</button>
                                    <div>Rating</div>
                                    <button className='ml-5' onClick={votedecrease}>⬇️</button>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                                Genre
                            </th>
                            <th scope="col" className="px-6 py-3 text-base">
                                <span className="sr-only">Remove</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            filteredmovies.map((movie) => (
                                <tr key={movie.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="px-6 py-4 text-base font-medium text-gray-900 dark:text-gray-900 whitespace-wrap">
                                        <div className='flex justify-start items-center'>
                                            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="w-24 h-20 mr-2" ></img>
                                            {(movie.title != undefined) ? movie.title : movie.name}
                                        </div>
                                    </th>
                                    <td className="px-20 py-4 text-base font-medium text-slate-400">
                                        {movie.popularity}
                                    </td>
                                    <td className="px-10 py-4 text-base font-medium text-slate-400">
                                        {movie.vote_average}
                                    </td>
                                    <td className="px-6 py-4 text-base font-medium text-slate-400">
                                        {genreids[movie.genre_ids[0]] || "Narrative"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:cursor-pointer" onClick={() => removefn(movie.id)}>Remove</div>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>


                <div className='sm:hidden '>
                    {
                        filteredmovies.map((movie)=>(
                            <div key={movie.id} className='flex flex-col m-1 border-2 border-slate-300 h-32 w-full'>
                            <div className='flex'>
                              <div className='border-2 w-32 h-24 bg-slate-400 '>
                              <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="w-32 h-24 bg-center" ></img>
                              </div>
                                  
                                <div className="ml-1 w-inherit">
                                    <div className="flex justify-end mt-1 "> 
                                  <button className='text-sm font-semibold border-2 rounded-xl border-sky-300 px-1' onClick={() => removefn(movie.id)}>Remove</button>
                                    </div>
                              <div className='flex flex-col whitespace-normal w-full' >          
                                  <div className="ml-1 text-sm font-semibold">Popularity : {movie.popularity} </div>
                                  <div className="ml-1 text-sm font-semibold">Rating :  {movie.vote_average}</div>
                                  <div className="ml-1 text-sm font-semibold">Genre : {genreids[movie.genre_ids[0]] || "Narrative"} </div>
                              </div>
                        
                           </div>
                        
                           </div>
                           <div className='bg-cyan-500 text-sm flex justify-center items-center font-semibold'>{movie.title || movie.name}</div>
                        
                           </div>   
                                       
                        ))
                    }
               
               </div>
            </div>


            <Pagination Increase={Increase} Decrease={Decrease} page={page} />
        </div>
    )
}
