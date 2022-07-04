import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  async function fetchMoviesHandler() {
    setIsLoading(true);
    // GET request
    const response = await fetch('https://swapi.dev/api/films/');

    // take the response and return it converted to json format
    const data = await response.json();

    // take the json data and map the results into a new array of objects called transformedMovies
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
      setIsLoading(false);

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
