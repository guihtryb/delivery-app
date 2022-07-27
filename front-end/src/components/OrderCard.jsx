import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function OrderCard({
  orderDatatest, orderId, orderStatus, orderAddress, orderData, orderTotal,
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
      data-testid={ `${orderDatatest}-${orderId}` }
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
            <h3>{ orderStatus }</h3>
          </div>
          <div className="orderInfos flex-column">
            <p className="order-data">{ orderData }</p>
            <p className="order-total">{ `R$${orderTotal}` }</p>
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
  orderDatatest: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderData: PropTypes.string.isRequired,
  orderTotal: PropTypes.string.isRequired,
  orderAddress: PropTypes.string.isRequired,
};
