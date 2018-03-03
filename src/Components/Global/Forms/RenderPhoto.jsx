import React from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import { Image } from 'cloudinary-react';


const RenderPhoto = (props) => {

  const { publicId } = props;

  console.log('this is my publicId at run time ====== ', publicId)

  return (
    <div>
      <Image cloudName="travelwme" publicId={publicId} />
    </div>
  );
};

export default RenderPhoto;

// const Champion = ({ data: { loading, getChampion } }) => {
//   if (loading) {
//     return <h1>loading...</h1>;
//   }

//   const { name, publicId } = getChampion;

//   return (
//     <div>
//       <h1>{name}</h1>
//       <Image cloudName="travelwme" publicId={publicId} />
//     </div>
//   );
// };

// // export default Champion;

// const getChampionQuery = gql`
//   query($id: Int!) {
//     getChampion(id: $id) {
//       name
//       publicId
//     }
//   }
// `;

// export default graphql(getChampionQuery, {
//   options: ({ match }) => ({
//     variables: match.params,
//   }),
// })(Champion);