import React from 'react';

const Message = ({ username, text }) => (
  <div>
    <h5>{username}</h5>
    <p>{text}</p>
  </div>
);

export default Message;