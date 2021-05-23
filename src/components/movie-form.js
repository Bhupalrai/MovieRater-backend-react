import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie'; // hooks


function MovieForm(props) {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription] = useState('');
    const [token] = useCookies(['mr-token']);

    // use hooks
    useEffect ( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    }, [props.movie])

    const updateClicked = () => {
        API.updateMovie(props.movie.id, {title, description}, token['mr-token'])
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }

    const createClicked = () => {
        API.createMovie({title, description}, token['mr-token'])
        .then( resp => props.movieCreated(resp))
        .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            { props.movie ? (
                <div>
                    <label htmlFor="title">Title</label><br></br>
                    <input id="title" type="text" placeholder="title" value={title}
                        onChange={ evt => setTitle(evt.target.value)}
                    />
                    
                    <br></br><br></br>
                    <label htmlFor="description">Description</label>
                    <br></br>
                    <textarea id="description" type="text" className="textarea" placeholder="description" value={description}
                        onChange={ evt => setDescription(evt.target.value)}
                    >
                    </textarea>
                    <br></br>

                    { props.movie.id ? 
                        <button onClick={updateClicked}>Update</button> :
                        <button onClick={createClicked}>Create</button>
                    } 

                </div>
            ): null }
        </React.Fragment>
    )
}

export default MovieForm;
