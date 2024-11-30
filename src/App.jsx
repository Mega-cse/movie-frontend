import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import MovieDetails from './Components/MovieDetails';
import FavoritesPage from './Components/FavoritesPage';
import './App.css'
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
