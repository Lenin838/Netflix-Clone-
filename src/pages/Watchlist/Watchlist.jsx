import React from 'react'
import './Watchlist.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useWatchlist } from '../../context/WatchlistContext'
import { Link } from 'react-router-dom'

const Watchlist = () => {
    const { watchlist, removeFromWatchlist } = useWatchlist();

    return (
        <div className='watchlist'>
            <Navbar />
            <div className='watchlist-container'>
                <h1>My Watchlist</h1>
                {watchlist.length === 0 ? (
                    <p className='empty-msg'>Your watchlist is empty.</p>
                ) : (
                    <div className='watchlist-grid'>
                        {watchlist.map((movie) => (
                            <div key={movie.id} className='watchlist-item'>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                                    <p>{movie.title}</p>
                                </Link>
                                <button className='remove-btn' onClick={() => removeFromWatchlist(movie.id)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Watchlist
