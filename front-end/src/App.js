import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import ProductsPage from './pages/ProductsPage';
import Register from './pages/Register';

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
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
