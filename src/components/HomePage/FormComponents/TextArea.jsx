import React from 'react';

const TextArea = (props) => {
  return (
    <div className="group">
      <label className="label">{props.title}</label>
      <textarea
        className="form-input"
        name={props.name}
        rows={props.rows}
        value={props.content}
        onChange={props.handleFunc}
        placeholder={props.placeholder} />
    </div>
  );
};

TextArea.propTypes = {
  title: React.PropTypes.string.isRequired,
  rows: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  handleFunc: React.PropTypes.func.isRequired,
};

export default TextArea;
