import React from 'react';

import TopMenu from './components/TopMenu';
import Products from './components/Products';
import useFetch from './hooks/useFetch';
import { URL_API_PRODUCTS } from './utils/constans';

function App() {
	
	const results = useFetch( URL_API_PRODUCTS, null );

	return (
		<>
			<TopMenu />

			<Products 
				results={ results }
			/>
		</>
	);
}

export default App;
