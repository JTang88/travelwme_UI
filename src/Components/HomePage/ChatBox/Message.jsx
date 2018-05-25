import React from 'react';

const Message = ({ msg: { username, text } }) => (
  <div>
    <h5>{username}</h5>
    <p>{text}</p>
  </div>
);
 
export default Message;