import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    // GET request
    fetch('https://swapi.dev/api/films/')
    // take the response and return it converted to json format
    .then(response => {
      return response.json();
    })
    // take the json data and map the results into a new array of objects called transformedMovies
    .then(data => {
      const transformedMovies = data.results.map(movieData => {
        // take out the data you want to use from each object(movieData)
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      // set the movies state to the new array of objects returned
      setMovies(transformedMovies);
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
