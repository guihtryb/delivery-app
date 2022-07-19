import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({
  userName, userRole,
}) {
  const history = useHistory();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  const handleRedirectProducts = () => {
    if (location.pathname !== '/customer/products') {
      history.push('/customer/products');
    }
  };
  const handleRedirectOrders = () => {
    if (location.pathname !== '/customer/orders') {
      history.push('/customer/orders');
    }
  };
  return (
    <div className="navbar flex-row">
      {
        userRole === 'customer' ? (
          <div className="flex-row">
            <button
              type="button"
              onClick={ handleRedirectProducts }
              data-testid="customer_products__element-navbar-link-products"
            >
              PRODUTOS
            </button>
            <button
              type="button"
              onClick={ handleRedirectOrders }
              data-testid="customer_products__element-navbar-link-orders"
            >
              MEUS PEDIDOS
            </button>
          </div>
        ) : (
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
          >
            PEDIDOS

          </button>
        )
      }
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {userName}
      </p>
      <button
        type="button"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  userName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};
