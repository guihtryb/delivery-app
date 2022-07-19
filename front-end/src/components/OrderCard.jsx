import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({
  orderDatatest, orderId, orderStatus, orderAddress, orderData, orderTotal,
}) {
  return (
    <div
      className="order-card flex-row"
      data-testid={ `${orderDatatest}-${orderId}` }
    >
      <div className="orderId flex-column">
        <p>Pedido</p>
        <p>{ orderId }</p>
      </div>
      <div className="status-card flex-column">
        <div className="status-infos flex-row">
          <div className="status-title">
            <h3>{ orderStatus }</h3>
          </div>
          <div className="orderInfos flex-column">
            <p>{ orderData }</p>
            <p>{ `R$${orderTotal}` }</p>
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
  orderTotal: PropTypes.number.isRequired,
  orderAddress: PropTypes.string.isRequired,
};
