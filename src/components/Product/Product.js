import React from 'react';
import PropTypes from 'prop-types';

import { Col, Card, Button } from 'react-bootstrap';

import './Product.scss';

const Product = ({ product, addProductCart }) => {

    const { extraInfo, image, name, price } = product;

    return (
        <Col 
            className="product"
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 4 }}
            lg={{ span: 3 }}
        >
            <Card>
                <Card.Img variant="top" src={ image } />

                <Card.Body>
                    <Card.Title>{ name }</Card.Title>

                    <Card.Text>{ extraInfo }</Card.Text>

                    <Card.Text>{ price.toFixed( 2 ) }$ / Unidad</Card.Text>

                    <Button
                        onClick={ () => addProductCart( product ) }
                    >Añadir al carrito</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    addProductCart: PropTypes.func.isRequired
};

export default Product;