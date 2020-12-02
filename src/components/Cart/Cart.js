import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import { STORAGE_PRODUCTS_CART } from '../../utils/constans';
import { removeArrayDuplicates, countDuplicateItemArray } from '../../utils/arrayFunc';

import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg';

import './Cart.scss';

const Cart = ({ productsCart, getProductsCart, results }) => {

    const [ cartOpen, setCartOpen ] = useState( false );
    const widthCartContent = cartOpen ? 370 : 0;

    const [ singleProductsCart, setSingleProductsCart ] = useState( [] );

    useEffect( () => {

        const allProductsId = removeArrayDuplicates( productsCart );
        setSingleProductsCart( allProductsId );

    }, [ productsCart ] );

    const openCart = () => { 
        setCartOpen( true ); 
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        setCartOpen( false );
        document.body.style.overflowY = 'scroll';
    }

    const emptyCart = () => {
        localStorage.removeItem( STORAGE_PRODUCTS_CART );
        getProductsCart();
    }

    return (
        <>
            <Button
                className="cart"
                variant="link"
            >
                { productsCart.length > 0 ?
                    (
                        <CartFull onClick={ openCart } />
                    )
                    :
                    (
                        <CartEmpty onClick={ openCart } />
                    )
                }
            </Button>

            <div 
                className="cart-content"
                style={{ width: widthCartContent } }
            >
                <CartContentHeader 
                    closeCart={ closeCart }
                    emptyCart={ emptyCart }
                />

                <div className="cart-content__products">
                    {
                        singleProductsCart.map( ( idProductsCart, index ) => (
                            <CartContentProducts 
                                key={ index }
                                results={ results }
                                idsProductsCart={ productsCart }
                                idProductCart={ idProductsCart }
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

const CartContentHeader = ({ closeCart, emptyCart }) => (
    <div className="cart-content__header">
        <div>
            <Close
                onClick={ closeCart } 
            />
        
            <h2>Carrito</h2>
        </div>

        <Button 
            onClick={ emptyCart }
            variant="link" 
        >
            Varciar
            
            <Garbage />
        </Button>
    </div>
);

const CartContentProducts = ({ results, idsProductsCart, idProductCart }) => {

    const { loading, result:products } = results;

    if( !loading && products ) {
        return products.map( ( product, index ) => {
            if( idProductCart === product.id ) {
                const quantity = countDuplicateItemArray( product.id, idsProductsCart );

                return (
                    <RenderProduct 
                        key={ index }
                        product={ product }
                        quantity={ quantity }
                    />
                )
            }
        });
    }

    return null;
};

const RenderProduct = ({ product, quantity }) => {

    const { image, name, price } = product;

    return (
        <div className="cart-content__product">
            <img src={ image } alt={ name } />

            <div className="cart-content__product-info">
                <div>
                    <h3>{ name.substr( 0, 25 ) }...</h3>

                    <p>{ price.toFixed( 2 ) } $ / ud.</p>
                </div>

                <div>
                    <p>En carro: { quantity } ud.</p>

                    <div>
                        <button>+</button>
                        <button>-</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
    results: PropTypes.object.isRequired,
    productsCart: PropTypes.array.isRequired,
    getProductsCart: PropTypes.func.isRequired
};

CartContentHeader.propTypes = {
    closeCart: PropTypes.func.isRequired,
    emptyCart: PropTypes.func.isRequired
};

export default Cart;