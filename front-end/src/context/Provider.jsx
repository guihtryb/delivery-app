import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';
import usersService from '../services/users';
import productsService from '../services/products';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersSelected, setOrdersSelected] = useState({});
  const [sellersOptions, setSellersOptions] = useState(['Fulana Pereira']);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSellersList = async () => {
      const sellersList = (await usersService.getSellers())
        .map((seller) => seller.name);
      setSellersOptions(sellersList);
    };

    const getProducts = async () => {
      const productsList = await productsService.getAll();
      setProducts(productsList);
    };

    getSellersList();
    getProducts();
  }, []);

  const updateCartProducts = (cartProduct) => {
    const { name, quantityProduct } = cartProduct;
    if (quantityProduct === 0) {
      const removedList = [...cartProducts.filter((product) => product.name !== name)];
      setCartProducts(removedList);
    } else {
      setCartProducts(
        [...cartProducts.filter((product) => product.name !== name), cartProduct],
      );
    }
  };

  const calcTotalPrice = (arrayCart) => arrayCart.reduce((acc, x) => {
    const { price, quantityProduct } = x;
    const aux = acc + parseFloat(price) * quantityProduct;
    return aux;
  }, 0);

  useEffect(() => {
    const priceReduced = calcTotalPrice(cartProducts);
    setTotalPrice(priceReduced.toFixed(2));
  }, [cartProducts]);

  const contextValue = {
    ordersSelected,
    setOrdersSelected,
    totalPrice,
    setTotalPrice,
    cartProducts,
    setCartProducts,
    orders,
    setOrders,
    updateCartProducts,
    sellersOptions,
    products,
  };

  useEffect(() => {
    const preçoTotal = calcTotalPrice(cartProducts);
    if (preçoTotal >= 0) {
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
