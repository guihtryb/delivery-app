import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';

function Login({ history }) {
  const { contexto } = useContext(deliveryContext);

  console.log(contexto);

  useEffect(() => {}, []);

  if (history.pathname.location === '/') {
    history.push('/login');
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
    pathname: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
