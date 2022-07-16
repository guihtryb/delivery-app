import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  console.log(useState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const contextValue = {
    totalPrice,
    setTotalPrice,
    cartProducts,
    setCartProducts,
  };

  useEffect(() => {
    console.log(cartProducts);
    const preçoTotal = cartProducts.reduce((acc, x) => {
      const { price, quantity } = x;
      const aux = acc + price * quantity;
      return aux;
    }, 0);
    console.log('PREÇO TOTAL - - - ', preçoTotal);
    if (preçoTotal) {
      setTotalPrice(preçoTotal);
    }
  }, [cartProducts]);

  return (
    <deliveryContext.Provider value={ contextValue }>
      {children}
    </deliveryContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
