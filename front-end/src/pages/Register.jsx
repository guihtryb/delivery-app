/* eslint-disable react-hooks/exhaustive-deps */
import React, { /* useContext, */ useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';

function invalidLogin() {
  return (
    <p
      data-testid="common_register__element-invalid_register"
    >
      Credencias Invalidas
    </p>
  );
}

function Register({ history }) {
  // const { contexto } = useContext(deliveryContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isLoginInvalid, setIsLoginInvalid] = useState(false);

  const registerButton = () => {
    axios.post('http://localhost:3001/users', { email, password, name })
      .then(() => {
        axios.post('http://localhost:3001/login', { email, password })
          .then((res) => {
            localStorage.setItem('user', res.data);
          });
        history.push('/customer/products');
      }).catch((err) => {
        const CONFLICT = 409;
        if (err.response.status === CONFLICT) setIsLoginInvalid(true);
        setIsLoginInvalid(true);
      });
  };

  const verifyInputs = () => {
    const minPassword = 6;
    const minName = 12;
    const validEmailExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const isValidEmail = validEmailExp.test(email);
    const isValidPassword = password.length >= minPassword;
    const isValidName = name.length >= minName;
    if (isValidEmail && isValidPassword && isValidName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target: { value, name: nameInput } }) => {
    if (nameInput === 'Email') {
      setEmail(value);
    } else if (nameInput === 'Senha') {
      setPassword(value);
    } else {
      setName(value);
    }
  };

  useEffect(() => {
    verifyInputs();
  }, [password, email, name, verifyInputs]);

  return (
    <div className="register flex-column">
      <form className="flex-column">
        <InputsText
          dataTestId="common_register__input-name"
          name="Name"
          stateName="Name"
          callBack={ handleChange }
        />
        <InputsText
          dataTestId="common_register__input-email"
          name="Email"
          stateName="Email"
          callBack={ handleChange }
        />
        <InputsText
          dataTestId="common_register__input-password"
          name="Senha"
          stateName="Senha"
          callBack={ handleChange }
        />
        <Button
          dataTestId="common_register__button-register"
          importanceClass="primary"
          name="CADASTRAR"
          callBack={ registerButton }
          disabled={ disabled }
        />
      </form>
      {
        isLoginInvalid && invalidLogin()
      }
    </div>
  );
}

export default Register;

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
