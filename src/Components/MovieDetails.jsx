import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';  // Import a CSS file for styling

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=73529b75`)
      .then(response => setMovie(response.data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-container">
      <h1 className="movie-title">{movie.Title}</h1>
      <div className="movie-details">
        <div className="movie-poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movie-info">
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
