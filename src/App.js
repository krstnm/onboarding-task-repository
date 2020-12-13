import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Customers from './components/Shop/CustomerFolder/Customer';
import Products from './components/Shop/ProductFolder/Product';
import Stores from './components/Shop/StoreFolder/Store';
import Sales from './components/Shop/SalesFolder/Sales'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Customers} />
        <Route path='/Product' component={Products} />
        <Route path='/Store' component={Stores} />
        <Route path='/Sales' component={Sales} />
      </Layout>
    );
  }
}
