import React from 'react';
import Layout from './containers/Layout/Layout';

import BurgerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/checkout';

function App() {
  return (
    <div>
      <Layout> 
          <BurgerBuilder/>
          <Checkout />
      </Layout>
    </div>
  );
}

export default App;
