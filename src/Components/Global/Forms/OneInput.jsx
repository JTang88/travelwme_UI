import React from 'react';
// import PropTypes from 'prop-types' 

const OneInput = ({
  type,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

// OneInput.propTypes = {  
//   handleFunc: PropTypes.func.isRequired,
//   content: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]).isRequired,

// };


export default OneInput;
