import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  return (
    <li>
    <Link to={`/details/${movie.imdbID}`}>
        <h5>{movie.Title} <small>({movie.Year})</small></h5>
        <figure className="movie-poster">
          <img
            src={movie.Poster}
            alt={movie.Title}
            title={movie.Title}
          />
        </figure>
        <span className="releaseDate">Release Year:{movie.Year} </span>
    </Link>
    </li>
  );
}

export default Movie;