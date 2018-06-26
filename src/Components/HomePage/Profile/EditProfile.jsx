import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Image } from 'cloudinary-react';
import Select from '../../Global/Forms/Select';
import TextArea from '../../Global/Forms/TextArea';
import UploadUser from '../../Global/Forms/UploadUser';
import updateUser from '../../../graphql/mutations/updateUser';

class EditProfile extends Component {
  state = { 
    ageOptions:
    [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
      62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
      84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    relationshipOptions: ['single', 'in a relationship', 'complicated'],
    genderOptions: ['male', 'female', 'other'],
    description: '',
    publicId: '',
  }

  handleInputChange = (event) => {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change);
  }

  handdleUpdateProfile = async (e) => {
    e.preventDefault();
    this.setState({ edit: false });
    const updatedUserInfo = {
      description: this.state.description || null,
      id: this.props.user.id,
      gender: this.state.gender || null,
      relationship: this.state.relationship || null,
      age: this.state.age || null,
      publicId: null,
    }

    this.props.mutate({
      variables: updatedUserInfo,
    });
  }

  render() {
    const { 
      user: {
        id,
        gender,
        relationship,
        age,
        description,
      }, 
    } = this.props;
    return (
      <div>
        <UploadUser
          id={id}
          getUpdatedPhoto={this.getUpdatedPhoto}
        >
          <Image
            className="profile-pic"
            cloudName="travelwme"
            publicId={this.props.publicId}
          />
        </UploadUser>
        <ul>
          <Select
            title="Gender"
            name="gender"
            placeholder={gender}
            handleFunc={this.handleInputChange}
            options={this.state.genderOptions}
            selectedOption={this.state.gender}
          />
          <Select
            title="Relationship"
            name="relationship"
            placeholder={relationship}
            handleFunc={this.handleInputChange}
            options={this.state.relationshipOptions}
            selectedOption={this.state.relationship}
          />
          <Select
            title="Age"
            name="age"
            placeholder={age}
            handleFunc={this.handleInputChange}
            options={this.state.ageOptions}
            selectedOption={this.state.age}
          />
          <TextArea
            type="text"
            title="About me:"
            rows={6}
            name="description"
            content={this.state.description}
            handleFunc={this.handleInputChange}
            placeholder={description || 'lease tell your future travel mates a little bit about yourself'}
          />
        </ul>
        <button className="btn btn-outline-info" onClick={this.handdleUpdateProfile}>Update Profile</button>
      </div> 
    );
  }
}


export default graphql(updateUser)(EditProfile);