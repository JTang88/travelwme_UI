import React from 'react';
import PropTypes from 'prop-types'

const SingleInput = (props) => {
return (
    <div className="form">
    <label className="label">{props.title}</label>
      <input
        // className="form-input"
        name={props.name}
        type={props.type}
        value={props.content}
        onChange={props.handleFunc}
        placeholder={props.placeholder} 
        />
    </div>
  );
}

SingleInput.propTypes = {  
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
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
