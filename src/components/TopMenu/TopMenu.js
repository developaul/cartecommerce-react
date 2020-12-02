import React from 'react';
import PropTypes from 'prop-types';

import { Container, Navbar } from 'react-bootstrap';

import Cart from '../Cart';

import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './TopMenu.scss';

const TopMenu = ({ productsCart, getProductsCart, results }) => (
    <Navbar
        className="top-menu"
        bg="dark"
        variant="dark"
    >
        <Container>
            <BrandNav />

            <Cart
                results={ results }
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
    results: PropTypes.object.isRequired,
    productsCart: PropTypes.array.isRequired,
    getProductsCart: PropTypes.func.isRequired
}

export default TopMenu;