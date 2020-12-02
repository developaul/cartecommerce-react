import React from 'react';
import PropTypes from 'prop-types';

import { Container, Navbar } from 'react-bootstrap';

import Cart from '../Cart';

import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './TopMenu.scss';

const TopMenu = ({ productsCart, getProductsCart }) => (
    <Navbar
        className="top-menu"
        bg="dark"
        variant="dark"
    >
        <Container>
            <BrandNav />

            <Cart 
                productsCart={ productsCart }
                getProductsCart={ getProductsCart }
            />
        </Container>
    </Navbar>
);

const BrandNav = () => (
    <Navbar.Brand>
        <Logo />
        <h2>Ice Cream Shop</h2>
    </Navbar.Brand>
);

TopMenu.propTypes = {
    productsCart: PropTypes.array.isRequired,
    getProductsCart: PropTypes.func.isRequired
}

export default TopMenu;