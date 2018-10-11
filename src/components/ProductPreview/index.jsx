import React, { Component } from "react";

import CardTitle from "react-md/lib/Cards/CardTitle";
import { FontIcon, Cell, Card, Media } from 'react-md';
import Img from "gatsby-image";

import './ProductPreview.scss';

class ProductPreview extends Component {
    constructor(props) {
        super(props);
        const { product } = props;
        this.state = {
            index: Math.round(Math.random() * (product.features.length - 1)),
            product
        };
    }

    onClick = () => {
        this.setState((state) => {
            return {
                index: (state.index + 1) % this.state.product.features.length
            }
        });
    }

    render() {
        const { product, addToCart } = this.props
        return (
            <Cell onClick={this.onClick} size={4}>
                <Card>
                    <CardTitle className='title-text' title={product.name}>
                    </CardTitle>
                    <Media>
                        <img src={product.features[this.state.index].url}></img>
                    </Media>
                    <FontIcon onClick={(e) => { e.stopPropagation(); addToCart(product, this.state.index) }}>control_point</FontIcon>
                    <FontIcon onClick={(e) => { e.stopPropagation(); this.onClick(); }} style={{ float: 'right' }}>arrow_forward_ios</FontIcon>
                </Card>
            </Cell>
        )
    }
}

export { ProductPreview };