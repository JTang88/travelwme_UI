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

    // eager = c_crop, w_400, h_400, g_face / w_50, h_50, c_scale | w_30, h_40, c_crop, g_south


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
      <div>
        <Dropzone onDrop={this.onDrop}>
          {this.props.children}
        </Dropzone>
      </div>
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
