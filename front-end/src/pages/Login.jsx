import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';

function Login({ history }) {
  const { contexto } = useContext(deliveryContext);
  console.log(contexto, history.location.pathname);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  const loginButton = () => {
    console.log('email : ', email, 'password: ', password);
    axios.get('https://localhost:3001/user', { email, password })
      .then((response) => {
        console.log(response);
      });
  };

  const registerButton = () => {
    history.push('/pagina');
  };

  const verifyInputs = () => {
    const min = 6;
    if (email.split('@').length === 2 && email.split('.').length === 2
    && password.length >= min) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'Email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  useEffect(() => {
    verifyInputs();
  }, [password, email]);

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
          disabled={ disabled }
        />
        <Button
          dataTestId="common_login__button-register"
          importanceClass="terciary"
          name="Ainda nao tenho conta"
          disabled={ false }
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
