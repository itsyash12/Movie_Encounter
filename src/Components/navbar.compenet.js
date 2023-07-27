import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
    <div className='flex space-x-5 px-2 py-1 items-center'>
    <Link to="/"><i className="fa-brands fa-imdb text-3xl md:text-5xl box-border"></i></Link>
     <Link to="/favourites" className='text-base md:text-2xl font-medium'>Favourites</Link>
    </div>
        )
    }
}
