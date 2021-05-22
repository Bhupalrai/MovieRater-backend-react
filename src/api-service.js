/**
 * We can use Hooks as well for services
 */

const TOKEN = '1691dff0c5090e081e592edd98cdf4856e33c1b9';
export class API {

  static loginUser(body) {
    return  fetch(`http://localhost:8000/auth/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`
      },
      body: JSON.stringify( body )
    }).then(resp => resp.json())
  }

  static updateMovie(mov_id, body) {
      return  fetch(`http://localhost:8000/api/movies/${mov_id}/`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN}`
        },
        body: JSON.stringify( body )
      }).then(resp => resp.json())
    } // eof updateMovie

    static createMovie(body) {
      return  fetch(`http://localhost:8000/api/movies/`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN}`
        },
        body: JSON.stringify( body )
      }).then(resp => resp.json())   
    } // eof createMovie

    static deleteMovie(mov_id) {
      return  fetch(`http://localhost:8000/api/movies/${mov_id}/`, {

        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${TOKEN}`
        }
      })
    }    
}