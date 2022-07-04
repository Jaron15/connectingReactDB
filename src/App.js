import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  async function fetchMoviesHandler() {
    setIsLoading(true);
    // clear the error state every time the function is called 
    setError(null);

    try {
    // GET request
    const response = await fetch('https://swapi.dev/api/films/');
    
    // throw error message if the server gives back an error
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

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
      } catch (error) {
    // set the errorState to the thrown message to be conditionally rendered
        setError(error.message);
      }
      setIsLoading(false);
  }

  // replace in-line conditional rendering by setting up a 'content'
  // variable to be rendered based on the if checks below 
  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content= <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
