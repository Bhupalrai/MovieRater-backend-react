/**
 * We can use Hooks as well for services
 */

export class API {

  static loginUser(body, token) {
    return  fetch(`http://localhost:8000/auth/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify( body )
    }).then(resp => resp.json())
  }

  static registerUser(body) {
    return  fetch(`http://localhost:8000/api/users/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( body )
    }).then(resp => resp.json())
  }


  static updateMovie(mov_id, body, token) {
      return  fetch(`http://localhost:8000/api/movies/${mov_id}/`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify( body )
      }).then(resp => resp.json())
    } // eof updateMovie

    static createMovie(body, token) {
      return  fetch(`http://localhost:8000/api/movies/`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify( body )
      }).then(resp => resp.json())   
    } // eof createMovie

    static deleteMovie(mov_id, token) {
      return  fetch(`http://localhost:8000/api/movies/${mov_id}/`, {

        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
    }    
}