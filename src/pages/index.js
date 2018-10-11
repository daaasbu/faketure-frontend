import React, { Component } from 'react'

import { ProductPreview } from '../components/ProductPreview';
import Layout from '../components/layout'
import { GridList } from 'react-md';
import './index.scss'
const uuidv4 = require('uuid/v4');

const { getCartBy, postCart } = require('../services/cart-service');



class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.state = { count: 0, cart: new Map(), sessionId: null }


  }

  componentDidMount() {
    let sessionId;
    if (sessionStorage) {
      sessionId = sessionStorage.getItem('sessionId');
      
      if (sessionId === null) {
        sessionId = uuidv4().split('-').join('');
      
        sessionStorage.setItem('sessionId', sessionId);
      }
    }

    getCartBy(sessionId).then(res => {
      if (res.data && res.data.length === 0) {
        this.setState({ count: 0, cart: new Map(), sessionId });
      } else {
        const item = res.data[0];
        const newItem = {...item, cart: this.jsonToStrMap(item.cart)};
        this.setState(newItem);
      }
    });
  }


  objToStrMap = (obj) => {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  jsonToStrMap = (jsonStr) => {
    return this.objToStrMap(JSON.parse(jsonStr));
  }


  addToCart = (product, index) => {
    this.setState(({ cart, count, sessionId }) => {
      const key = `${product.id}_${index}`;
      const prev = cart.get(key);
      const newItem = {
        count: count + 1,
        cart: cart.set(key, prev ? { ...prev, count: prev.count + 1 } : { product, index, count: 1 }),
      };
      postCart(sessionId, newItem);
      return newItem;
    })
  }

  offsetItemCount = (key, offset) => {
    this.setState(({ cart, count, sessionId }) => {

      const item = cart.get(key);
      const newCount = item.count + offset;
      const newState = (newCount <= 0) ?
        this.removeItem(cart, item.count, key, sessionId) :
        {
          cart: cart.set(key, { ...item, count: item.count + offset }),
          count: count + offset
        };
        postCart(sessionId, newState);
      return newState;
    });
  }

  incrementItemCount = (key) => {
    this.offsetItemCount(key, 1);
  }

  decrementItemCount = (key) => {
    this.offsetItemCount(key, -1);
  }


  removeItem = (cart, count, key, sessionId) => {
    const item = cart.get(key);
    cart.delete(key);
    const newItem = {
      cart,
      count: count - item.count
    };
    postCart(sessionId, newItem);
    return newItem;
  }

  removeFromCart = (key) => {
    this.setState(({ cart, count, sessionId }) => this.removeItem(cart, count, key, sessionId));
  }

  render() {

    return (
      <Layout cart={this.state.cart} cartManager={{ increment: this.incrementItemCount, decrement: this.decrementItemCount, remove: this.removeFromCart }}>
        {
          <GridList size={3} container="pictures" component="section" className='examples-page'>
            {
              this.data.allProduct
                .edges
                .map(({ node }) => (
                  <ProductPreview key={node.id} product={node} addToCart={this.addToCart} />
                ))
            }
          </GridList>
        }
      </Layout>
    )
  }
}


export const query = graphql`
{
  allProduct {
    edges {
      node {
        name,
        id,
        category,
        features	{
          url,
          color,
          price
        }
      }
    }
  }
}
`

export default IndexPage
