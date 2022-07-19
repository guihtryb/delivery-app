import React from 'react';
import PropTypes from 'prop-types';

function InputsSelect({ dataTestId, callBack, stateName, name, options }) {
  return (
    <label htmlFor={ stateName }>
      { name }
      <select
        name={ stateName }
        className="input-select"
        data-testid={ dataTestId }
        onChange={ callBack }
      >
        {
          options.map((x) => (
            <option key={ `${x} option` } value={ x }>{ x }</option>
          ))
        }
      </select>
    </label>
  );
}
export default InputsSelect;

InputsSelect.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
