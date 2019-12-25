import React from 'react';
import Layout from './containers/Layout/Layout';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import BurgerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout> 
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
