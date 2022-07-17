import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import DetailsOrder from '../components/DetailsOrder';

function CustomerOrder({ history }) {
  const { orders } = useContext(deliveryContext);

  // AQUI IREMOS RECEBER TODOS OS PEDIDOS REGISTRADOS NA API, E FILTRAR BASEANDO NO ID DA PESSOA USUARIA.
  console.log(orders[0], history);

  return (
    <div className="order-page flex-column">
      <DetailsOrder pedidos={ orders[0] } />
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
