import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './index.css';

class UploadUser extends React.Component {
  state = {
    file: null,
  }
    
  onDrop = async (files) => {
    await this.setState({ file: files[0] });

    const { id } = this.props;
    const { file } = this.state;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'syav4cph');

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/travelwme/image/upload`,
      formData,
    );
    console.log('inside of onDrop after response', response)


    await this.props.mutate({
      variables: {
        id,
        publicId: response.data.public_id,
      },
    });
  }

  render() {
    return (
      <a href="#">
        <Dropzone className="upload-user-container" onDrop={this.onDrop}>
          {this.props.children}
        </Dropzone>
      </a>
    );
  }
}


const addPhotoToUser = gql`
  mutation addPhotoToUser($id: Int!, $publicId: String!) {
    addPhotoToUser(id: $id, publicId: $publicId) {
      id
      publicId
    }
  }
`;

export default graphql(addPhotoToUser)(UploadUser);
