import React from 'react';

const RadioGroup = (props) => {
  return (
    <div>
      <label className="label">{props.title}</label>
      <div className="radio-group">
        {props.options.map((options) => {
          return (
            <div>
              <label>
                <input 
                  className="form-radio"
                  name={props.setName}
                  onChange={props.handleFunc}
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
	title: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	selectedOptions: React.PropTypes.array,
	handleFunc: React.PropTypes.func.isRequired
};

export default RadioGroup;

/*  <div> 
            <label key={option} className="form-label capitalize">
              <input
                className="form-radio"
                name={props.setName}
                onChange={props.controlFunc}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type={props.type} /> {option}
            </label>
            <div>*/
