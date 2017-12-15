import React from 'react';

// export default 
const Select = (props) => {
  return (
    <div className="group">
      <select
        name={props.name}
        value={props.selectedOption}
        onChange={props.handleFunc}
        className="form-select">
        <option value="">{props.placeholder}</option>
        {props.options.map((opt) => {
          return (
            <option
              key={opt}
              value={opt}
            > {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  selectedOption: React.PropTypes.string,
  handleFunc: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string
};

export default Select;
