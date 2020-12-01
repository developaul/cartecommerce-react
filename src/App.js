import React from 'react';

import TopMenu from './components/TopMenu';
import useFetch from './hooks/useFetch';
import { URL_API_PRODUCTS } from './utils/constans';

function App() {
	
	const results = useFetch( URL_API_PRODUCTS );

	console.log( results );



	return (
		<div>
			<TopMenu />
		</div>
	);
}

export default App;
