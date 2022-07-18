import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import deliveryContext from '../context/deliveryContext';
import Button from '../components/Button';
import InputsText from '../components/InputsText';

function Register({ history }) {
  const { contexto } = useContext(deliveryContext);
  console.log(contexto, history.location.pathname);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);

  const registerButton = () => {
    console.log('email : ', email, 'password: ', password, 'name : ', name);
    try {
      // AINDA NAO TEMOS A API PRONTA PARA FAZER E TESTAR ESSAS REQUISICOES
      // MAS O MOLDE SERIA ESSE
      axios.post('https://localhost:3001/users', { email, password, name })
        .then((response) => {
          // VERIFICA SE O USUARIO DIGITADO EXISTE OU NAO, E SE NAO EXISTIR, REGISTRA ELE.
          // AI DEPOIS DE REGISTAR, SERIA INTERESSANTE JA ENVIAR O CLIENTE PARA A PAGINA DE PRODUTOS
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const verifyInputs = () => {
    const minPassword = 6;
    const minName = 12;
    if (email.split('@').length === 2 && email.split('.').length === 2
    && password.length >= minPassword && name.length >= minName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target: { value, name: nameInput } }) => {
    console.log('email : ', email, 'password: ', password, 'name : ', name);
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
  }, [password, email, name]);

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
          dataTestId="common_login__button-login"
          importanceClass="primary"
          name="CADASTRAR"
          callBack={ registerButton }
          disabled={ disabled }
        />
      </form>
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
