import './App.css';
import React, { useState, useEffect } from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie'; // hooks
import { useFetch } from './components/hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


function App() {

  const [token, setToken, deleteToken] = useCookies(['mr-token']);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  /*
  Fetch data here.
  Use Js Promise and Catch.
  */
  useEffect ( () => {
    fetch("http://localhost:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))
  }, []);

  useEffect( () => {
    console.log(token);

    // if token in present then login
    if(!token['mr-token']) window.location.href = '/';
  }, [token]);
  
  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie); // we will feed thid to our form component
    setSelectedMovie(null);
  }

  // we force app to refetch data when ever update is done in details component
  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if(mov.id === movie.id){
        return movie;
      }
      return mov;
    })
    setMovies(newMovies);
  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie]; // append new movie to array
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const logOutUser = () => {
    deleteToken(['mr-token']);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logOutUser} />
        </header>
        <div className="layout">

          {/* accepted functions movieClicked,  
              from child
          */}
          <div>
            <MovieList
              movies={movies} 
              movieClicked={loadMovie} 
              editClicked={editClicked}
              removeClicked={removeClicked}
            />   

            <button onClick={newMovie}>New movie</button>  
          </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />

          { editedMovie ? 
              <MovieForm movie={editedMovie} updateMovie={updatedMovie} movieCreated={movieCreated}/>
            : null
          }

        </div>
    </div>
  );
}

export default App;
