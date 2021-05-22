import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api-service';


function MovieList(props){

    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }

    // we will notify parent a movie is clicked
    const editClicked = movie => {
        props.editClicked(movie);
    }

    const removeClicked = movie => {
        API.deleteMovie(movie.id)
            .then(() => props.removeClicked(movie))
            .catch(error => console.log())
    }

    return (
        <div>
            { props.movies && props.movies.map( movie => {
                return (
                    <div key={movie.id} className='movie-item' >
                        <h2 onClick={movieClicked(movie)}
                            // onmouseover="this.style.color='red';"
                            // onMouseEnter={() => setColor("orange")}
                            // onMouseLeave={() => setColor("")}
                        >
                            {movie.title}
                        </h2>

                        <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)} />
                    </div>
                )
            })}
        </div>
    )
}

export default MovieList;