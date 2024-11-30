import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaUser, FaArrowLeft, FaArrowRight } from 'react-icons/fa';  // Importing Font Awesome icons
import MovieCard from './MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]); // Movie search results
  const [searchQuery, setSearchQuery] = useState(''); // Search input query
  const [favorites, setFavorites] = useState([]); // Favorite movies list
  const [currentIndex, setCurrentIndex] = useState(0); // Image slider index
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalResults, setTotalResults] = useState(0); // Total number of movies returned by the API

  const moviesPerPage = 10; // Number of movies per page

  // Image slider images
  const sliderImages = [
    "https://cdn.marvel.com/content/1x/spidermannwh_hardcover.jpg",
    "https://wallpapers.com/images/high/captain-america-movie-m51cvl6rj7vxjfko.webp",
    "https://static.toiimg.com/thumb/msid-100627160,width-1070,height-580,imgsize-102336,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  ];

  // Image slider functionality
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length
    );
  };

  // Fetch movies from the OMDB API based on the search query and pagination
  useEffect(() => {
    if (searchQuery.length > 2) { // Only search if query length is greater than 2
      axios.get(`https://www.omdbapi.com/?s=${searchQuery}&page=${currentPage}&apikey=73529b75`)
        .then(response => {
          if (response.data.Search) {
            setMovies(response.data.Search); // Set movie results
            setTotalResults(parseInt(response.data.totalResults)); // Set total number of results
          }
        });
    }
  }, [searchQuery, currentPage]); // Runs when searchQuery or currentPage changes

  // Add movie to favorites
  const handleAddToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  // Pagination handler
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>   
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>OMDB MOVIES</h1>
        </div>

        {/* Right Corner Icons */}
        <div className="navbar-right">
          <Link to="/favorites">
            <FaHeart size={30} className="icon" />
          </Link>
          <Link to="/login">
            <FaUser size={30} className="icon" />
          </Link>
        </div>
      </nav>

      {/* Header with Image Slider */}
      <header className="image-slider">
        <div className="slider-container">
          {/* Left Arrow for Image Slider */}
          <FaArrowLeft
            size={40}
            className="slider-arrow left"
            onClick={handlePrev}
          />

          {/* Image Slider Image */}
          <img
            src={sliderImages[currentIndex]}
            alt="Slider"
            className="slider-image"
          />

          {/* Right Arrow for Image Slider */}
          <FaArrowRight
            size={40}
            className="slider-arrow right"
            onClick={handleNext}
          />

          {/* Search Bar inside the Slider */}
          <div className="search-container-inside-slider">
            <input
              type="text"
              placeholder="Search for movies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Trigger search on change
            />
          </div>
        </div>
      </header>

      {/* Movie Cards */}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {Math.ceil(totalResults / moviesPerPage)}</span>
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(totalResults / moviesPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
