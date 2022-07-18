import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, dataTestId, callBack, importanceClass, disabled }) {
  return (
    <button
      // quando o butao é disabilitadom a classe muda para deixar a cor apagada.
      // verificar no index.css, as classes que ajudam a ficar menos horrivel a pagina kkk ta tudo muito obvio la
      className={ !disabled ? importanceClass : `${importanceClass} disabilitado` }
      type="button"
      data-testid={ dataTestId }
      onClick={ callBack }
      disabled={ disabled }
    >
      {
        name
      }
    </button>
  );
}
export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  dataTestId: PropTypes.string.isRequired,
  importanceClass: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};
