import React, { useState, useContext, useEffect } from 'react';
import { API } from '../api-service'; 
import { TokenContext } from '../index';


function Auth(){

    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');

    // set token to context so that we can use these
    // variables through out the the page we need
    const {token, setToken }  = useContext(TokenContext);
    
    // log the changed token and redirec to next page
    useEffect( () =>{
        console.log(token);
        if(token) window.location.href = '/movies';
    }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
        .then(resp => setToken(resp.token))
        .catch(error => console.log(error))
    }

    return (
        <div>
            <label htmlFor="username">Username</label><br></br>
            <input id="username" type="text" placeholder="username" value={username}
                onChange={ evt => setUsername(evt.target.value)}
            />            
            <br></br>
            
            <label htmlFor="password">Password</label><br></br>
            <input id="password" type="password" placeholder="password" value={password}
                onChange={ evt => setPassword(evt.target.value)}
            />
            <br></br>

            <button onClick={loginClicked}>Login</button>

        </div>
    )
}

export default Auth;