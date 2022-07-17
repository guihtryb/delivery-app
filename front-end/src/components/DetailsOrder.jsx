import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ProductCartCard from './ProductCartCard';

const sellerTest = 'customer_order_details__element-order-details-label-seller-name';
const pedidoIdTest = 'customer_order_details__element-order-details-label-order-id';
const dataTest = 'customer_order_details__element-order-details-label-order-date';
const statusTest = 'customer_order_details__element-order-details-label-delivery-status';
const deliveryTest = 'customer_order_details__button-delivery-check';

function DetailsOrder({ name, data, callBack, orderIndex, status, pedidos }) {
  return (
    <label htmlFor="tabela">
      Detalhe do Pedido
      <table name="tabela">
        <thead>
          <th data-testid={ pedidoIdTest }>{ `PEDIDO ${orderIndex}` }</th>
          {
            name ? <th data-testid={ sellerTest }>{ name }</th> : null
          }
          <th data-testid={ dataTest }>{ data }</th>
          <th data-testid={ statusTest }>{ status }</th>
          <th>
            <Button
              name="MARCAR COMO ENTREGUE"
              dataTestId={ deliveryTest }
              importanceClass="primary"
              disabled="false"
              callBack={ callBack }
            />
          </th>
        </thead>
        <tbody>
          {
            pedidos.map((pedido, index) => (
              <ProductCartCard
                name={ pedido.name }
                key={ `key ${pedido.name}` }
                price={ pedido.price }
                quantity={ pedido.quantity }
                index={ index }
              />
            ))
          }
        </tbody>
      </table>
    </label>
  );
}
export default DetailsOrder;

DetailsOrder.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  data: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
  orderIndex: PropTypes.number.isRequired,
  pedidos: PropTypes
    .arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired,
};
