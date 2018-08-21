import React from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import { Image } from 'cloudinary-react';

process.env.REACT_APP_CLOUDNAME

const RenderPhoto = (props) => {

  const { publicId } = props;
  return (
    <div>
      <Image cloudName={process.env.REACT_APP_CLOUDNAME} publicId={publicId} />
    </div>
  );
};

export default RenderPhoto;
