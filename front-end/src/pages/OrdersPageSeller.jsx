import React from 'react';
import Navbar from '../components/Navbar';
// import PropTypes from 'prop-types';
import OrderCard from '../components/OrderCard';

function OrdersPageSeller() {
  const orders = [
    {
      orderId: 1,
      orderStatus: 'entregue',
      orderAddress: 'rua sem saída',
      orderData: '23/23/23',
      orderTotal: 1234124,
    },
    {
      orderId: 2,
      orderStatus: 'pendente',
      orderAddress: 'rua de casa',
      orderData: '23/23/23',
      orderTotal: 1234124,
    },
  ];
  return (
    <div className="products-page flex-column">
      <Navbar />
      <main>
        {
          orders.map((x) => {
            const {
              orderId, orderStatus, orderAddress, orderData, orderTotal } = x;
            return (<OrderCard
              key={ `${orderId}` }
              orderDatatest="seller_orders__element-order-date"
              orderId={ orderId }
              orderStatus={ orderStatus }
              orderAddress={ orderAddress }
              orderData={ orderData }
              orderTotal={ orderTotal }
            />);
          })
        }
      </main>
    </div>
  );
}

export default OrdersPageSeller;

// OrdersPage.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//     location: PropTypes.shape({
//       pathname: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
// };
