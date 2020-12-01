import { useState, useEffect } from 'react';

const useFetch = ( url, options ) => {

    const [ loading, setLoading ]   = useState( true );
    const [ result, setResult ]     = useState( null );
    const [ error, setError ]       = useState( null );    

    useEffect( () => {

        ( async () => {

            try {
  
                const res   = await fetch( url );
                const json  = await res.json();

                setResult( json );

            } catch( err ) {

                setError( err );

            } finally {
                
                setLoading( false );

            }

        })();

    }, [ options, url ] );

    return { loading, result, error };
}

export default useFetch;