import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row } from 'react-bootstrap';

import Loading from '../Loading';
import Product from '../Product';

import './Products.scss';

const Products = ({ results, addProductCard }) => {

    const {  result:products, loading } = results;

    return (
        <Container>
            <Row>
                { loading || !products ? 
                    (
                        <Loading />
                    )
                :
                    (
                        products.map( product => (
                            <Product 
                                key={ product.id }
                                product={ product }
                                addProductCard={ addProductCard }
                            />
                        ))
                    )
                }
            </Row>
        </Container>
    )
};

Products.propTypes = {
    results: PropTypes.object.isRequired,
    addProductCard: PropTypes.func.isRequired
};

export default Products;