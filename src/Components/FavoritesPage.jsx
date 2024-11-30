import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css'; 
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFromFavorites = (movieId) => {
    // Remove movie from favorites list
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <h3>{movie.Title}</h3>
              <button onClick={() => handleRemoveFromFavorites(movie.imdbID)}>
                Remove
              </button>
              <Link to={`/movie/${movie.imdbID}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
