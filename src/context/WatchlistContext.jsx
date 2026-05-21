import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem("netflix_watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("netflix_watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.find(m => m.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
            toast.success("Added to Watchlist");
        } else {
            toast.info("Already in Watchlist");
        }
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist(watchlist.filter(m => m.id !== movieId));
        toast.info("Removed from Watchlist");
    };

    const value = {
        watchlist,
        addToWatchlist,
        removeFromWatchlist
    };

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
};
