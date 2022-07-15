import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';

function Login({ history }) {
  const { contexto } = useContext(deliveryContext);
  console.log(contexto, history.location.pathname);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginButton = () => {
    console.log('email : ', email, 'password: ', password);
  };

  const registerButton = () => {
    history.push('/pagina');
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'Email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  useEffect(() => {}, []);

  if (history.location.pathname === '/') {
    history.push('login');
  }

  return (
    <div className="login flex-column">
      <div>
        <img src="logo" alt="imagem-logo" />
        <h1>Delivery app</h1>
      </div>
      <form className="flex-column">
        <InputsText
          dataTestId="common_login__input-email"
          name="Login"
          stateName="Email"
          callBack={ handleChange }
        />
        <InputsText
          dataTestId="common_login__input-password"
          name="Senha"
          stateName="Senha"
          callBack={ handleChange }
        />
        <Button
          dataTestId="common_login__button-login"
          importanceClass="primary"
          name="LOGIN"
          callBack={ loginButton }
        />
        <Button
          dataTestId="common_login__button-register"
          importanceClass="secundary"
          name="Ainda nao tenho conta"
          callBack={ registerButton }
        />
      </form>
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
