import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Image } from 'cloudinary-react';
import Select from '../../Forms/Select';
import TextArea from '../../Forms/TextArea';
import UploadUser from '../../Forms/UploadUser';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import getUser from '../../../../graphql/queries/getUser';
import updateUser from '../../../../graphql/mutations/updateUser';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      ageOptions:
       [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
         40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 
         62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 
         84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
      relationshipOptions: ['single', 'in a relationship', 'complicated'],
      genderOptions: ['male', 'female', 'other'],
      body_typeOptions: ['average', 'atheltic', 'sexy', 'well-rounded'],
      description: '',
      publicId: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handdleUpdateProfile = this.handdleUpdateProfile.bind(this);
    this.getUpdatedPhoto = this.getUpdatedPhoto.bind(this);
  }

  getUpdatedPhoto(pid) {
    this.setState({
      publicId: pid,
    });
  }

  handleInputChange(event) {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change);   
  }

  async handdleUpdateProfile(e) {
    e.preventDefault();
    this.setState({ edit: false });
    console.log(this.state);

    const updatedUserInfo = {
      description: this.state.description || null,
      id: this.props.getUserQuery.getUser.id,
      gender: this.state.gender || null,
      body_type: this.state.body_type || null,
      relationship: this.state.relationship || null,
      age: this.state.age || null,
      publicId: this.state.publicId || null,
    }

    this.props.updateUserMutation({
      variables: updatedUserInfo,
    });
  }


  render() {
    console.log('props in profile: ', this.props)
    return !this.props.getUserQuery.loading ? (
      <div className="text-center">
        <h1>{this.props.getUserQuery.getUser.username}</h1>
        { 
          this.state.edit ?
            <div>
              <UploadUser 
                id={this.props.getCurrentUserQuery.getCurrentUser.id} 
                getUpdatedPhoto={this.getUpdatedPhoto} 
              /> 
              <ul>
                <Select
                  title="Gender"
                  name="gender"
                  placeholder={this.props.getUserQuery.getUser.gender}
                  handleFunc={this.handleInputChange}
                  options={this.state.genderOptions}
                  selectedOption={this.state.gender}
                />
                <Select
                  title="Body_type"
                  name="body_type"
                  placeholder={this.props.getUserQuery.getUser.body_type}
                  handleFunc={this.handleInputChange}
                  options={this.state.body_typeOptions}
                  selectedOption={this.state.body_type}
                />
                <Select
                  title="Relationship"
                  name="relationship"
                  placeholder={this.props.getUserQuery.getUser.relationship}
                  handleFunc={this.handleInputChange}
                  options={this.state.relationshipOptions}
                  selectedOption={this.state.relationship}
                />
                <Select
                  title="Age"
                  name="age"
                  placeholder={this.props.getUserQuery.getUser.age}
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
                  placeholder={this.props.getUserQuery.getUser.description || 'lease tell your future travel mates a little bit about yourself' }
                /> 
              </ul>
              <button className="btn btn-outline-info" onClick={this.handdleUpdateProfile}>Update Profile</button>
            </div> : 
            <div>
              <Image 
                cloudName="travelwme" 
                className="rounded" 
                publicId={this.state.publicId || this.props.getUserQuery.getUser.publicId} 
              /> 
              <ul>
                <div>Gender: {this.props.getUserQuery.getUser.gender}</div>
                <div>Body Type: {this.props.getUserQuery.getUser.body_type}</div>
                <div>Relationship: {this.props.getUserQuery.getUser.relationship}</div>
                <div>Age: {this.props.getUserQuery.getUser.age}</div>
                <div>About me: 
                  <p>{this.props.getUserQuery.getUser.description}</p>
                </div>
              </ul>
              {
                this.props.getCurrentUserQuery.getCurrentUser.id === this.props.getUserQuery.getUser.id ?
                  <button className="btn btn-outline-info" onClick={() => (this.setState({ edit: true }))} >Edit</button> : ''
              }
            </div>
        }
      </div>
    ) : 'loading';
  }
}


const WrapedProfile = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getUser, {
    name: 'getUserQuery',
    options: props => (
      { variables: { id: props.match.params.id ? props.match.params.id : props.getCurrentUserQuery.getCurrentUser.id } }
    ), 
  }),
  graphql(updateUser, { name: 'updateUserMutation' }),
)(Profile);

export default WrapedProfile;
