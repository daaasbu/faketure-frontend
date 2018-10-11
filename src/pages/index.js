import React, { Component } from 'react'
import { Link } from 'gatsby'
import { ProductPreview } from '../components/ProductPreview';
import Layout from '../components/layout'
import { GridList } from 'react-md';
import './index.scss'

const { getCartBy } = require('../services/cart-service');
const uuidv4 = require('uuid/v4');


class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
    this.state = { count: 0, cart: new Map(), sessionId: null }


  }

  componentDidMount() {
    let sessionId;
    if (sessionStorage) {
      sessionId = sessionStorage.getItem('sesionId');
    }
    const isNewSession = (sessionStorage && sessionId);

    if (isNewSession) {
      sessionId = new uuidv4();
      sessionStorage.setItem('sessionId', sessionId);
    }

    const cartPromise = isNewSession ? new Promise(resolve => resolve({ count: 0, cart: new Map(), sessionId })) : getCartBy(sessionId);
    cartPromise.then(cart => {
      console.log(cart);
      this.setState(cart);
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
    this.setState(({ cart, count }) => {
      const key = `${product.id}_${index}`;
      const prev = cart.get(key);
      return {
        count: count + 1,
        cart: cart.set(key, prev ? { ...prev, count: prev.count + 1 } : { product, index, count: 1 }),
      };
    })
  }

  offsetItemCount = (key, offset) => {
    this.setState(({ cart, count }) => {

      const item = cart.get(key);
      const newCount = item.count + offset;
      const newState = (newCount <= 0) ?
        this.removeItem(cart, item.count, key) :
        {
          cart: cart.set(key, { ...item, count: item.count + offset }),
          count: count + offset
        };
      return newState;
    });
  }

  incrementItemCount = (key) => {
    this.offsetItemCount(key, 1);
  }

  decrementItemCount = (key) => {
    this.offsetItemCount(key, -1);
  }


  removeItem = (cart, count, key) => {
    const item = cart.get(key);
    cart.delete(key);
    return {
      cart,
      count: count - item.count
    };
  }

  removeFromCart = (key) => {
    this.setState(({ cart, count }) => this.removeItem(cart, count, key));
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
