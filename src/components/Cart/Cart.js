import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import { STORAGE_PRODUCTS_CART } from '../../utils/constans';

import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg';

import './Cart.scss';

const Cart = ({ productsCart, getProductsCart }) => {

    const [ cartOpen, setCartOpen ] = useState( false );
    const widthCartContent = cartOpen ? 350 : 0;

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
            </div>
        </>
    );
};

const CartContentHeader = ({ closeCart, emptyCart }) => {

    return (
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
};

Cart.propTypes = {
    productsCart: PropTypes.array.isRequired,
    getProductsCart: PropTypes.func.isRequired
};

CartContentHeader.propTypes = {
    closeCart: PropTypes.func.isRequired,
    emptyCart: PropTypes.func.isRequired
};

export default Cart;