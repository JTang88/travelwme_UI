import React from 'react';
import PropTypes from 'prop-types';

// export default 
const Select = (props) => {
  return (
    <div className="group">
      <div>
        <label>{props.title}</label>
      </div>
      <div>
      <select
        name={props.name}
        value={props.selectedOption}
        onChange={props.handleFunc}
        className="form-select">
        <option value="">{props.placeholder}</option>
        
        {
          // props.options.isArray ?
          props.options.map((option) => {
            return (
              <option
                key={option}
                value={option}
              > {option}
              </option>
            );
          }) 
          // : 
          //   <option
          //   key={options}
          //   value={options}
          // > {options}
          // </option>
          }
      </select>
      </div>
    </div>
  );
};

Select.propTypes = {
  // title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  selectedOption: PropTypes.string,
  handleFunc: PropTypes.func.isRequired,
  // placeholder: PropTypes.string
};

export default Select;
