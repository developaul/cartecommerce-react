import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import { STORAGE_PRODUCTS_CART } from '../../utils/constans';
import { removeArrayDuplicates, countDuplicateItemArray, removeItemArray } from '../../utils/arrayFunc';

import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg';

import './Cart.scss';

const Cart = ({ productsCart, getProductsCart, results }) => {

    const { loading, result } = results;

    const [ cartOpen, setCartOpen ] = useState( false );
    const widthCartContent = cartOpen ? 370 : 0;

    const [ singleProductsCart, setSingleProductsCart ] = useState( [] );

    const [ cartTotalPrice, setCartTotalPrice ] = useState( 0 );

    useEffect( () => {

        const allProductsId = removeArrayDuplicates( productsCart );
        setSingleProductsCart( allProductsId );

    }, [ productsCart ] );

    useEffect( () => {

        const productData = [];

        let totalPrice = 0;

        const allProductsId = removeArrayDuplicates( productsCart );

        allProductsId.forEach( productId => {

            const quantity      = countDuplicateItemArray( productId, productsCart );
            const productValue  = {
                id: productId,
                quantity
            };

            productData.push( productValue );
        });

        if( !loading && result ) {
            result.forEach( product => {
                productData.forEach( item => {

                    if( product.id = item.id ) {
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue;
                    }

                });
            });
        }

        setCartTotalPrice( totalPrice );
    }, [productsCart, results] );

    const openCart = () => { 
        setCartOpen( true ); 
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        setCartOpen( false );
        document.body.style.overflowY = 'scroll';
    };

    const emptyCart = () => {
        localStorage.removeItem( STORAGE_PRODUCTS_CART );
        getProductsCart();
    };

    const increaseQuantity = id => {
        const arrayItemsCart = productsCart;
        arrayItemsCart.push( id );
        localStorage.setItem( STORAGE_PRODUCTS_CART, JSON.stringify( arrayItemsCart ) );
        getProductsCart();
    };

    const decreaseQuantity = id => {
        const arrayItemsCart    = productsCart;
        const result            = removeItemArray( arrayItemsCart, id );
        localStorage.setItem( STORAGE_PRODUCTS_CART, JSON.stringify( result ) );
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
                                increaseQuantity={ increaseQuantity }
                                decreaseQuantity={ decreaseQuantity }
                            />
                        ))
                    }
                </div>

                <CartContentFooter cartTotalPrice={ cartTotalPrice } />
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
            Vaciar
            
            <Garbage />
        </Button>
    </div>
);

const CartContentProducts = ({ results, idsProductsCart, idProductCart, increaseQuantity, decreaseQuantity }) => {

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
                        increaseQuantity={ increaseQuantity }
                        decreaseQuantity={ decreaseQuantity }
                    />
                );
            }

            return null;
        });
    }

    return null;
};

const RenderProduct = ({ product, quantity, increaseQuantity, decreaseQuantity }) => {

    const { id, image, name, price } = product;

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
                        <button
                            onClick={ () => increaseQuantity( id ) }
                        >+</button>

                        <button
                            onClick={ () => decreaseQuantity( id ) }
                        >-</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartContentFooter = ({ cartTotalPrice }) => (
    <div className="cart-content__footer">
        <div>
            <p>Total aproximado: </p>
            <p>{ cartTotalPrice.toFixed( 2 ) } $</p>
        </div>

        <Button>Tramitar Pedido</Button>
    </div>
);

Cart.propTypes = {
    results: PropTypes.object.isRequired,
    productsCart: PropTypes.array.isRequired,
    getProductsCart: PropTypes.func.isRequired
};

CartContentHeader.propTypes = {
    closeCart: PropTypes.func.isRequired,
    emptyCart: PropTypes.func.isRequired
};

CartContentProducts.propTypes = {
    results: PropTypes.object.isRequired,
    idsProductsCart: PropTypes.array.isRequired,
    idProductCart: PropTypes.number.isRequired,
    increaseQuantity: PropTypes.func.isRequired,
    decreaseQuantity: PropTypes.func.isRequired
};

RenderProduct.propTypes = {
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    increaseQuantity: PropTypes.func.isRequired,
    decreaseQuantity: PropTypes.func.isRequired
};

CartContentFooter.propTypes = {
    cartTotalPrice: PropTypes.number.isRequired
};

export default Cart;