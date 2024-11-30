import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is already in favorites (in localStorage)
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movieIsFavorite = savedFavorites.some((favMovie) => favMovie.imdbID === movie.imdbID);
    setIsFavorite(movieIsFavorite);
  }, [movie]);

  const handleToggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      // Remove the movie from favorites
      const updatedFavorites = savedFavorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false); // Update state
      onRemoveFromFavorites(movie); // Optionally notify parent to update UI
    } else {
      // Add the movie to favorites
      savedFavorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setIsFavorite(true); // Update state
      onAddToFavorites(movie); // Optionally notify parent to update UI
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/movie/${movie.imdbID}`}>
   
      </Link>
    </div>
  );
};

export default MovieCard;
