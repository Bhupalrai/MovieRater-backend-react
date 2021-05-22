import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MovieDetails(props){

    const [hilighted, setHilighted] = useState(-1);

    // we need to notify parent about state change
    const mov = props.movie;

    const hilightedRate = high => evt => {
        setHilighted(high);
    }

    const rateClicked = rate => evt => {
        fetch(`http://localhost:8000/api/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 1691dff0c5090e081e592edd98cdf4856e33c1b9'
            },
            body: JSON.stringify( {stars: rate + 1} )
          })
          .then( () => getDetails())
          .then( resp => props.updateMovie(resp))
          .catch( error => console.log(error))
    }

    const getDetails = () => {
        fetch(`http://localhost:8000/api/movies/${mov.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 1691dff0c5090e081e592edd98cdf4856e33c1b9'
            }
          })
          .then( resp => resp.json())
          .then( resp => props.updateMovie(resp))
          .catch( error => console.log(error))        
    }

    return (
        <React.Fragment>
            { mov ? (
                <div>
                    <h1>{props.movie.title}</h1>
                    <p>{props.movie.description}</p>
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0 ? 'orange':''} />
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1 ? 'orange':''} />
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2 ? 'orange':''} />
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3 ? 'orange':''} />
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4 ? 'orange':''} />
                    ({mov.avg_rating})
                    <div className='rate-container'> 
                        <h2>Rate it</h2>
                        { [...Array(5)].map( (e, i) => {
                            return  <FontAwesomeIcon key={i} icon={faStar} className={hilighted > i - 1 ? 'purple':''}
                                    onMouseEnter={hilightedRate(i)}
                                    onMouseLeave={hilightedRate(-1)}
                                    onClick={rateClicked(i)} 
                            />
                        })}
                    </div>
                </div>
            ) : null }
        </  React.Fragment>
    )
}

export default MovieDetails;