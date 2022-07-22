import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';

function OrdersPage() {
  const [orders, setOrders] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    axios
      .get('http://localhost:3001/sales/user', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="products-page flex-column">
      <Navbar />
      { isLoading ? (<p>Loading</p>) : (
        <main>
          {
            orders.map((x) => {
              const {
                id, status, saleDate, totalPrice } = x;
              return (<OrderCard
                key={ `${id}` }
                orderDatatest="customer_products__element-order-date"
                orderId={ id }
                orderStatus={ status }
                orderData={ saleDate }
                orderTotal={ totalPrice }
              />);
            })
          }
        </main>
      )}
    </div>
  );
}

export default OrdersPage;
