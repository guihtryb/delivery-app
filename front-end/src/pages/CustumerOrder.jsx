import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import DetailsOrder from '../components/DetailsOrder';
// import deliveryContext from '../context/deliveryContext';
import salesService from '../services/sales';
import Navbar from '../components/Navbar';

function CustomerOrder() {
  // const { ordersSelected } = useContext(deliveryContext);
  const [order, setOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    // const { token } = JSON.parse(localStorage.getItem('user'));
    const url = pathname.split('/');
    const id = url[url.length - 1];

    const loadOrder = async () => {
      const orderData = await salesService.getBySaleId(id);
      setOrder(orderData);
    };
    loadOrder();

    setIsLoading(false);
  }, [pathname]);

  return (
    <div className="order-page flex-column">
      <Navbar />
      { isLoading ? (<p>Loading</p>) : (
        <DetailsOrder
          // wip - sale=order, e remover outras props
          name="Fulana Pereira"
          pedidos={ [order] } // wip - order.products
          data={ order.saleDate }
        />
      )}
    </div>
  );
}

export default CustomerOrder;

CustomerOrder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
