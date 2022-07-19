import React from 'react';
import Navbar from '../components/Navbar';
// import PropTypes from 'prop-types';
import OrderCard from '../components/OrderCard';

function OrdersPage() {
  const orders = [
    {
      orderDatatest: 'orderDatatest',
      orderId: 1,
      orderStatus: 'entregue',
      orderAddress: 'rua sem saída',
      orderData: '23/23/23',
      orderTotal: 1234124,
    },
    {
      orderDatatest: 'orderDatatest2',
      orderId: 2,
      orderStatus: 'pendente',
      orderAddress: 'rua de casa',
      orderData: '23/23/23',
      orderTotal: 1234124,
    },
  ];
  return (
    <div className="products-page flex-column">
      <Navbar userName="User" userRole="customer" />
      <main>
        {
          orders.map((x) => {
            const {
              orderDatatest,
              orderId, orderStatus, orderAddress, orderData, orderTotal } = x;
            return (<OrderCard
              key={ `${orderId}` }
              orderDatatest={ orderDatatest }
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

export default OrdersPage;

// OrdersPage.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//     location: PropTypes.shape({
//       pathname: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
// };
