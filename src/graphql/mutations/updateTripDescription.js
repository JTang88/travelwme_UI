import gql from 'graphql-tag';

const updateTripDescription = gql`
mutation updateTripDescription($id: Int!, $description: String!) {
  updateTripDescription(id: $id, description: $description) {
    id
    description
  } 
}
`;

export default updateTripDescription;