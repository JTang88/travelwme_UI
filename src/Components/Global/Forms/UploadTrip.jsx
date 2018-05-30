import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class UploadTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this); 
  }
    
  async onDrop(files) {
    this.setState({ file: files[0] });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async submit() {
    // const { id } = this.props;
    const { file } = this.state;

    const formData = new FormData();  
    formData.append('file', file);
    formData.append('upload_preset', 'nlizwxq2');

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/travelwme/image/upload`,
      formData,
    );

    this.props.getpublicId(response.data.public_id);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}


// const addPhotoToUser = gql`
//   mutation addPhotoToUser($id: Int!, $publicId: String!) {
//     addPhotoToUser(id: $id, publicId: $publicId) 
//   }
// `;

// const addPhotoToUser = gql`
//   mutation addPhotoToTrip($id: Int!, $publicId: String!) {
//     addPhotoToTrip(id: $id, publicId: $publicId) 
//   }
// `;

// export default graphql(addPhotoToUser)(UploadTrip);
export default UploadTrip;
