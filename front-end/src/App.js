import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Checkout from './pages/Checkout';
import CustomerOrder from './pages/CustumerOrder';
import Login from './pages/Login';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import Register from './pages/Register';
import OrdersPageSeller from './pages/OrdersPageSeller';
import SellerOrder from './pages/SellerOrder';

function App() {
  return (
    <Provider>
      <div className="app">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ ProductsPage } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ OrdersPage } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrder } />
          <Route exact path="/seller/orders" component={ OrdersPageSeller } />
          <Route exact path="/seller/orders/:id" component={ SellerOrder } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
