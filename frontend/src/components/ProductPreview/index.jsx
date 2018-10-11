import React, { Component } from "react";

import CardTitle from "react-md/lib/Cards/CardTitle";
import Button from "react-md/lib/Buttons";
import Avatar from "react-md/lib/Avatars";
import { Cell, Card, Media } from 'react-md';

import CardText from "react-md/lib/Cards/CardText";
import FontIcon from "react-md/lib/FontIcons";
import { Link } from "gatsby";

import MaterialIcon, { colorPalette } from 'material-icons-react';

class ProductPreview extends Component {
    constructor(props) {
        super(props);
        const { product } = props;
        this.state = {
            index: 0,
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
                    <CardTitle title={product.name}>
                    </CardTitle>
                    <Media>
                        <img src={product.features[this.state.index].url}></img>
                    </Media>
                    <MaterialIcon onClick={(e) => { e.stopPropagation(); addToCart(product, this.state.index) }} icon="control_point" />
                </Card>
            </Cell>
        )
    }
}

export { ProductPreview };