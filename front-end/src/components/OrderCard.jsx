import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const dateParse = (date) => {
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2].split('T')[0];

  return `${day}/${month}/${year}`;
};

const priceParse = (priceToParse) => priceToParse.replace('.', ',');

function OrderCard({
  orderId, orderStatus, orderAddress, orderData, orderTotal,
}) {
  const history = useHistory();
  const location = useLocation();
  const handleRedirectOrders = () => {
    if (location.pathname !== '/customer/orders') {
      history.push(`/seller/orders/${orderId}`);
    } else {
      history.push(`/customer/orders/${orderId}`);
    }
  };
  return (
    <div
      className="order-card flex-row"
      onClick={ handleRedirectOrders }
      onKeyPress={ handleRedirectOrders }
      role="none"
    >
      <div className="orderId flex-column">
        <span
          data-testid={ `customer_orders__element-order-id-${orderId}` }
        >
          {`pedido ${orderId}`}
        </span>
      </div>
      <div className="status-card flex-column">
        <div className="status-infos flex-row">
          <div className="status-title">
            <h3
              data-testid={ `customer_orders__element-delivery-status-${orderId}` }
            >
              { orderStatus }
            </h3>
          </div>
          <div className="orderInfos flex-column">
            <p
              className="order-data"
              data-testid={ `customer_orders__element-order-date-${orderId}` }
            >
              { dateParse(orderData) }
            </p>
            <p
              className="order-total"
              data-testid={ `customer_orders__element-card-price-${orderId}` }
            >
              { priceParse(orderTotal) }
            </p>
          </div>
        </div>
        {
          orderAddress ? (
            <div>
              <p>
                { orderAddress }
              </p>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderData: PropTypes.string.isRequired,
  orderTotal: PropTypes.number.isRequired,
  orderAddress: PropTypes.string.isRequired,
};
