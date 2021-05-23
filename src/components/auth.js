import React, { useState, useEffect } from 'react';
import { API } from '../api-service'; 
import { useCookies } from 'react-cookie'; // hooks

// bootstrap
// import only required component if possible
import 'bootstrap/dist/css/bootstrap.min.css';


function Auth(){

    const [isLoginView, setIsLoginView] = useState(true);

    // set token to context so that we can use these
    // variables through out the the page we need
    const [token, setToken ]  = useCookies(['mr-token']);

    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    
    // log the changed token and redirec to next page
    useEffect( () =>{
        console.log(token);

        // if token in present then login
        if(token['mr-token']) window.location.href = '/movies';
    }, [token]);

    const loginClicked = () => {
        API.loginUser({username, password})
        .then(resp => setToken('mr-token', resp.token))
        .catch(error => console.log(error))
    }

    const registerClicked = () => {
        API.registerUser({username, password})
        .then(() => loginClicked())
        .catch(error => console.log(error))
    }

    return (
        <div className="App">
            < div className="login-container">

                {isLoginView ? <h1>Login</h1> : <h1>Register</h1> }

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
                <br></br>

                {isLoginView ?
                    <button onClick={loginClicked}>Login</button> : 
                    <button onClick={registerClicked}>Register</button>
                }
                
                {isLoginView ?
                    <p onClick={() => setIsLoginView(false)}>Don't have an Account? Register here!</p> :
                    <p onClick={() => setIsLoginView(true)}>Have an Account? Login here </p>                 
                }
            </div>
        </div>
    )
}

export default Auth;