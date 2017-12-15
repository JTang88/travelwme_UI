import React from 'react';

const SingleInput = (props) => {
return (
    <div className="form">
      <label className="label">{props.title}</label>
      <input
        className="form-input"
        name={props.name}
        type={props.inputType}
        value={props.content}
        onChange={props.handleFunc}
        // placeholder={props.placeholder} 
        />
    </div>
  );
}

SingleInput.propTypes = {  
  inputType: React.PropTypes.oneOf(['text', 'number']).isRequired,
  title: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  handleFunc: React.PropTypes.func.isRequired,
  content: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  // placeholder: React.PropTypes.string,
};

/*note: need a handle change function in the form component 
  handleSomeChange(e){
    this.setState({ prop: e.target.value});
  }
*/
//double check .oneOf vs oneOfType

export default SingleInput;
