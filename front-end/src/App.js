import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <div className="app">
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
