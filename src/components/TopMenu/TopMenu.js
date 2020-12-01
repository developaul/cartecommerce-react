import React from 'react';

import { Container, Navbar } from 'react-bootstrap';

import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './TopMenu.scss';

const TopMenu = () => (
    <Navbar
        className="top-menu"
        bg="dark"
        variant="dark"
    >
        <Container>
            <BrandNav />
        </Container>
    </Navbar>
);

const BrandNav = () => (
    <Navbar.Brand>
        <Logo />
        <h2>Ice Cream Shop</h2>
    </Navbar.Brand>
);

export default TopMenu;