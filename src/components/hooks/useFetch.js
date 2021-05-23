import {useState, useEffect} from 'react';

/**
 * Test custom hooks here
 */
function useFetch(){
    // data source
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect( () => {

        async function fetchData () {
            setLoading(true);
            setError();
        }

    }, []);

}

export {useFetch};