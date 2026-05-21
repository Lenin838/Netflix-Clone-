import React, { useEffect, useState } from 'react'
import './MovieDetail.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../../context/WatchlistContext'
import play_icon from '../../assets/play_icon.png'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();
    const [movie, setMovie] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjNhYWQwODkwOTlmMDMwZmY3NDY2YjZmZGIxYzFlYyIsIm5iZiI6MTc3MDc3OTkwNS4zNTM5OTk5LCJzdWIiOiI2OThiZjUwMThkNTRhYTFlNzJkNTQxNzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pxcqs4xC1OcgMyLmafBKwf2dSOscCae9WcsjEGCJ7KI'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovie(res))
            .catch(err => console.error(err));
    }, [id]);

    if (!movie) return <div className='loading'>Loading...</div>;

    return (
        <div className='movie-detail'>
            <Navbar />
            <div className='detail-container'>
                <div className='detail-banner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                    <div className='banner-overlay'>
                        <div className='detail-info'>
                            <h1>{movie.title}</h1>
                            <p className='tagline'>{movie.tagline}</p>
                            <div className='meta'>
                                <span>{movie.release_date.split('-')[0]}</span>
                                <span>{movie.runtime} min</span>
                                <span>{movie.vote_average.toFixed(1)} Rating</span>
                            </div>
                            <p className='overview'>{movie.overview}</p>
                            <div className='detail-btns'>
                                <button className='btn' onClick={() => navigate(`/player/${movie.id}`)}>
                                    <img src={play_icon} alt="" />Play
                                </button>
                                {watchlist.some(m => m.id === movie.id) ? (
                                    <button className='btn watchlisted-btn' onClick={() => removeFromWatchlist(movie.id)}>
                                        ✓ Watchlisted
                                    </button>
                                ) : (
                                    <button className='btn dark-btn' onClick={() => addToWatchlist(movie)}>
                                        + Add to Watchlist
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MovieDetail
