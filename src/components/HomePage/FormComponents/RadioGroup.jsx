import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  return (
    <div>
      <label className="label">{props.title}</label>
      <div className="radio-group">
        {props.options.map((option) => {
          return (
            <div>
              <label>
                <input 
                  className="form-radio"
                  name={props.setName}
                  onClick={props.handleFunc}
                  value={option}
                />
              </label>
            </div>
          )
        }) }
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  setName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array,
  handleFunc: PropTypes.func.isRequired
};

export default RadioGroup;
