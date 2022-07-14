import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';

function Login({ history }) {
  const { contexto } = useContext(deliveryContext);
  console.log(contexto, history.location.pathname);

  useEffect(() => {}, []);

  if (history.location.pathname === '/') {
    history.push('login');
  }

  return (
    <div className="login">
      login
    </div>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
