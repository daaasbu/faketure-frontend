import React, { Component } from 'react';
import { Button, FontIcon, Card, CardTitle, CardActions, Avatar, CardText, DialogContainer, List, ListItem } from 'react-md';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this._mounted = false;
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        if (this._mounted) { this.setState({ visible: false }); }
    };

    handleKeyDown = (e) => {
        const key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
            // also close on enter or space keys
            this.hide();
        }
    };

    convertMap = (m) => {
        const a = [];
        for (const key of m.keys()) {
            a.push({ key, item: m.get(key) });
        }
        return a;
    }

    render() {
        const { visible } = this.state;
        const { count, cart, cartManager } = this.props;
        const items = cart ? this.convertMap(cart) : [];
        return (
            <div>
                <Button raised onClick={this.show}>
                    <FontIcon >shopping_cart</FontIcon>
                    {count}</Button>
                <DialogContainer
                    width={400}
                    id="simple-list-dialog"
                    visible={visible}
                    title="Cart"
                    onHide={this.hide}
                    focusOnMount={false}
                >
                    <List onClick={this.hide} onKeyDown={this.handleKeyDown}>
                        {
                            items.length === 0 ?
                                (<Card style={{ width: 400 }} className="md-block-centered">
                                    <CardTitle
                                        title={'Empty Cart'}
                                    />
                                    <CardText>
                                        <p>
                                            Please add items to cart before checking out.
                                         </p>
                                    </CardText>
                                </Card>
                                ) :
                                items.map(({ key, item }) => (

                                    <ListItem key={key} primaryText="" onClick={e => e.stopPropagation()}>

                                        <Card style={{ width: 400 }} className="md-block-centered">
                                            <CardTitle
                                                title={item.product.name}
                                                subtitle={`${item.product.category} $${item.product.features[item.index].price} `}

                                                avatar={<Avatar width={100} src={item.product.features[item.index].url} role="presentation" />}
                                            />
                                            <CardText>
                                                <p>
                                                    This is a product description.
                                         </p>
                                            </CardText>
                                            <CardActions>
                                                <FontIcon onClick={(e) => { cartManager.remove(key); e.stopPropagation(); }}>delete</FontIcon>
                                                <FontIcon onClick={(e) => { cartManager.increment(key); e.stopPropagation(); }}>control_point</FontIcon>
                                                <FontIcon onClick={(e) => { cartManager.decrement(key); e.stopPropagation(); }}>remove_circle</FontIcon>
                                                <CardText>
                                                    {item.count}
                                                </CardText>
                                            </CardActions>

                                        </Card>
                                    </ListItem>
                                ))
                        }
                    </List>
                </DialogContainer>
            </div>
        );
    }
}


export { Cart };
