import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import TopMenu from './components/TopMenu';
import Products from './components/Products';
import useFetch from './hooks/useFetch';

import { URL_API_PRODUCTS, STORAGE_PRODUCTS_CART } from './utils/constans';

function App() {
	
	const results = useFetch( URL_API_PRODUCTS, null );

	const [ productsCart, setProductsCart ] = useState( [] );

	useEffect( () => {

		getProductsCart();

	}, [] );

	const getProductsCart = () =>{ 
		const idsProducts = JSON.parse( localStorage.getItem( STORAGE_PRODUCTS_CART ) ) || [];
		setProductsCart( idsProducts );
	};
	
	const addProductCart = ({ id, name }) => {

		const idsProducts = productsCart;
		idsProducts.push( id );

		setProductsCart( idsProducts );
		
		localStorage.setItem( STORAGE_PRODUCTS_CART, JSON.stringify( productsCart ) );

		getProductsCart();

		toast.success( `${ name } añadido al carrito correctamente` );
	};

	return (
		<>
			<TopMenu 
				productsCart={ productsCart }
				getProductsCart={ getProductsCart }
			/>

			<Products 
				results={ results }
				addProductCart={ addProductCart }
			/>

			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnVisibilityChange={false}
				draggable
				pauseOnHover={ false }
			/>
		</>
	);
};

export default App;