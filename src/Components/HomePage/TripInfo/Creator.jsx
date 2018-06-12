import React from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import MessageButton from '../../Global/Forms/MessageButton';

const Creator = ({
  trip: {
    creator: {
      id,
      publicId,
      username,
      gender,
      birthday,
      relationship,
    },
  },
  currentUserType,
}) => (
  <Link to={`/homepage/profile/${id}`} href={`/homepage/profile/${id}`}>
    <div className="col-4">
      <h4>Creator</h4>
      <Image cloudName="travelwme" className="rounded" publicId={publicId} />
    </div>
    <div className="col-4">
      <li>
        <ul>{username}</ul>
        <ul>{gender}</ul>
        <ul>{birthday}</ul>
        <ul>{relationship}</ul>
        {
          currentUserType !== 'C' ?
            <MessageButton receiverUserId={id} /> : null
        }
      </li>
    </div>
  </Link>
);

export default Creator;
