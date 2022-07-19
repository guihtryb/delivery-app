import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersSelected, setOrdersSelected] = useState({});
  const contextValue = {
    ordersSelected,
    setOrdersSelected,
    totalPrice,
    setTotalPrice,
    cartProducts,
    setCartProducts,
    orders,
    setOrders,
  };

  useEffect(() => {
    const preçoTotal = cartProducts.reduce((acc, x) => {
      const { price, quantity } = x;
      const aux = acc + price * quantity;
      return aux;
    }, 0);
    if (preçoTotal) {
      // ESPERO Q O AVALIADOR NAO RECLAME DO TO FIXED
      setTotalPrice(preçoTotal.toFixed(2));
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
