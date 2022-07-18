import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';

function Login({ history }) {
  const { contexto } = useContext(deliveryContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isLoginInvalid, setIsLoginInvalid] = useState(false)

  const loginButton = () => {
    try {
      axios.post('http://localhost:3001/login', { email, password })
        .then((response) => {
          console.log(response);
          const { role } = response.data
          // VERIFICAÇAO SE O CUSTUMER EXISTE, E SE EXISTER, MANDAR ELE PRA PAGINA CERTA
          // SO VERIFICAR A ROLE DA RESPOSTA COMO NO EXEMPLO ABAIXO
          if (role === 'customer') {
            history.push('/customer/products');
          }
          if (role === 'administrator') {
            history.push('/customer/products');
          }
          if (role === 'seller') {
            history.push('/customer/products');
          }
        }).catch((err) => {
          if (err.response.status === 404) setIsLoginInvalid(true)
        });
    } catch (err) {
      console.log(err);
    }
  };

  const registerButton = () => {
    history.push('/register');
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
    // LOGICA PRA MUDAR O NOME DA ROTA CASO SEJA /
    // NAO CONSEGUI VERIFICAR O PORQUE NAO PASSA NO TESTE
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
          callBack={handleChange}
        />
        <InputsText
          dataTestId="common_login__input-password"
          name="Senha"
          stateName="Senha"
          callBack={handleChange}
        />
        <Button
          dataTestId="common_login__button-login"
          importanceClass="primary"
          name="LOGIN"
          callBack={loginButton}
          disabled={disabled}
        />
        <Button
          dataTestId="common_login__button-register"
          importanceClass="terciary"
          name="Ainda nao tenho conta"
          disabled={false}
          callBack={registerButton}
        />
      </form>
      {
        isLoginInvalid &&
        <p
          datatestid="common_login__element-invalid-email">
          Credencias Invalidas
        </p>
      }
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
