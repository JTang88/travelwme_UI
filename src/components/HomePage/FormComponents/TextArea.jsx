import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  return (
    <div>
      <div>
        <label className="label">{props.title}</label>
      </div>
    <div>
      <textarea
        // className="form-input"
        type={props.type}
        name={props.name}
        rows={props.rows}
        value={props.content}
        onChange={props.handleFunc}
        placeholder={props.placeholder} />
    </div>   
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextArea;
