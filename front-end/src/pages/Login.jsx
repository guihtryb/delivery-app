import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';

function invalidLogin() {
  return (
    <p
      datatestid="common_login__element-invalid-email"
    >
      Credencias Invalidas
    </p>
  );
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
        console.log(response);
        const { role } = response.data;
        // VERIFICAÇAO SE O CUSTUMER EXISTE, E SE EXISTER, MANDAR ELE PRA PAGINA CERTA
        // SO VERIFICAR A ROLE DA RESPOSTA COMO NO EXEMPLO ABAIXO
        if (role === 'customer') {
          history.push('/customer/products');
        }
      }).catch((err) => {
        const NOT_FOUND = 404;
        if (err.response.status === NOT_FOUND) setIsLoginInvalid(true);
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
    console.log(isValidEmail, isValidPassword);
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
          name="Ainda não tenho conta"
          disabled={ false }
          callBack={ registerButton }
        />
      </form>
      {
        isLoginInvalid && invalidLogin()
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
