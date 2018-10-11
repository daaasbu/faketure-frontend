import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Toolbar } from 'react-md'
import './layout.scss'
import { Cart } from './Cart'
const Layout = ({ children, cart, count, cartManager }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CMaterial+Icons" rel="stylesheet"/>
        </Helmet>
        <Toolbar
          colored
          title={data.site.siteMetadata.title}
          nav={(
            <Cart cart={cart} count={count} cartManager={cartManager}></Cart>
          )}></Toolbar>

        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
