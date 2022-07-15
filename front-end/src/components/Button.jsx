import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, dataTestId, callBack, importanceClass }) {
  return (
    <button
      className={ importanceClass }
      type="button"
      data-testid={ dataTestId }
      onClick={ callBack }
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
  dataTestId: PropTypes.string.isRequired,
  importanceClass: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};
