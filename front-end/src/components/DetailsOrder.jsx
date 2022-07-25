import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ProductCartCard from './ProductCartCard';
import deliveryContext from '../context/deliveryContext';

const sellerTest = 'customer_order_details__element-order-details-label-seller-name';
const pedidoIdTest = 'customer_order_details__element-order-details-label-order-id';
const dataTest = 'customer_order_details__element-order-details-label-order-date';
const statusTest = 'customer_order_details__element-order-details-label-delivery-status';
const deliveryTest = 'customer_order_details__button-delivery-check';

// wip - substituir todas props por apenas sale
function DetailsOrder({
  name,
  data,
  callBack,
  orderIndex,
  status,
  pedidos /* wip - substituir pedidos por products */ }) {
  const { cartProducts } = useContext(deliveryContext); // wip - substituir context por prop products
  console.log(cartProducts);
  return (
    <label htmlFor="tabela">
      Detalhe do Pedido
      <table name="tabela">
        <thead>
          <th data-testid={ pedidoIdTest }>
            { `PEDIDO ${orderIndex}`/* wip - substituir por id da venda saleId */}
          </th>
          {
            name ? <th data-testid={ sellerTest }>{ name }</th> : null
          }
          <th data-testid={ dataTest }>{ data }</th>
          <th data-testid={ statusTest }>{ status }</th>
          {
            name ? (
              <th>
                <Button
                  name="MARCAR COMO ENTREGUE"
                  dataTestId={ deliveryTest }
                  importanceClass="primary"
                  disabled="false"
                  callBack={ callBack }
                />
              </th>
            ) : null
          }
          <Button
            name="PREPARAR PEDIDO"
            dataTestId={ deliveryTest }
            importanceClass="primary"
            disabled="false"
            callBack={ callBack }
          />
          <Button
            name="SAIU PARA ENTREGA"
            dataTestId={ deliveryTest }
            importanceClass="primary"
            disabled="false"
            callBack={ callBack }
          />
        </thead>
        <thead>
          <th>item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitario</th>
          <th>SubTotal</th>
        </thead>
        <tbody>
          {
            cartProducts.map((pedido, index) => (
              <ProductCartCard
                name={ pedido.name }
                key={ `key ${pedido.name}` }
                price={ pedido.price }
                quantity={ pedido.quantityProduct }
                index={ index }
              />
            ))
          }
        </tbody>
        <h1
          data-testid="seller_order_details__element-order-total-price"
          className="primary"
        >
          {`Total: R$ ${pedidos[0].totalPrice}`}
        </h1>
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
    .arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
    })).isRequired,
};
