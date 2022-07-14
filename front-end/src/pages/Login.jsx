import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';

function Login({ history }) {
  const {
  } = useContext(deliveryContext);

  useEffect(() => {
  }, []);

  if (history.pathname.location === '/') {
    history.push('/login');
  }

  return (
    <div className="login">
    </div>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
