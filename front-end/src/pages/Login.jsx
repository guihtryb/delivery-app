/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/Login.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import deliveryApp from '../images/delivery.png';
// import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';
import img from '../images/trybelogo.png';

function invalidLogin() {
  return (
    <p
      data-testid="common_login__element-invalid-email"
    >
      Credencias Invalidas
    </p>
  );
}

// Lenny - Criei essa função para ajustar o erro de complexidade do lint.
function checkLogin(role, history) {
  if (role === 'customer') {
    history.push('/customer/products');
  } else if (role === 'seller') {
    history.push('/seller/orders');
  }
}

function Login({ history }) {
  // const { contexto } = useContext(deliveryContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isLoginInvalid, setIsLoginInvalid] = useState(false);

  const loginButton = () => {
    axios.post('http://localhost:3001/login', { email, password })
      .then((response) => {
        const { role } = response.data;
        // VERIFICAÇAO SE O CUSTUMER EXISTE, E SE EXISTER, MANDAR ELE PRA PAGINA CERTA
        // SO VERIFICAR A ROLE DA RESPOSTA COMO NO EXEMPLO ABAIXO
        localStorage.setItem('user', JSON.stringify(response.data));
        checkLogin(role, history);
      }).catch((err) => {
        const NOT_FOUND = 404;
        if (err.response.status === NOT_FOUND) setIsLoginInvalid(true);
        setIsLoginInvalid(true);
      });
  };

  const registerButton = () => {
    history.push('/register');
  };

  const verifyInputs = () => {
    const min = 6;
    const validEmailExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const isValidEmail = validEmailExp.test(email);
    const isValidPassword = password.length >= min;
    if (isValidEmail && isValidPassword) {
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
  }, [password, email, verifyInputs]);

  if (history.location.pathname === '/') {
    // LOGICA PRA MUDAR O NOME DA ROTA CASO SEJA /
    // NAO CONSEGUI VERIFICAR O PORQUE NAO PASSA NO TESTE
    history.push('login');
  }

  return (
    <section className="login flex-column">
      <div className="login-container">
        <form className="flex-column">
          <img src={ img } className="form-logo" alt="imagem-logo" width="70px" />
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
          <div className="buttons-login-container">
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
              name="Ainda não tenho conta"
              disabled={ false }
              callBack={ registerButton }
            />
          </div>
        </form>
      </div>
      <div>
        <div className="flex-row brand">
          <h1>Delivery app</h1>
          <img className="delivery-logo" src={ img } alt="imagem-logo" width="70px" />
        </div>
        <img className="delivery-img" src={ deliveryApp } alt="" />
      </div>
      {
        isLoginInvalid && invalidLogin()
      }
    </section>
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
