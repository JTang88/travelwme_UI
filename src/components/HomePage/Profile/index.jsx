import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Image } from 'cloudinary-react';
import Select from '../FormComponents/Select';
import TextArea from '../FormComponents/TextArea';
import { setCurrentUser } from '../../../actions/authActions';
import UploadUser from '../FormComponents/UploadUser';


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
      oldPhoto: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handdleUpdateProfile = this.handdleUpdateProfile.bind(this);
    this.getUpdatedPhoto = this.getUpdatedPhoto.bind(this);
  }

  getUpdatedPhoto(pid) {
    this.setState({
      publicId: pid,
      oldPhoto: false,
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
      description: this.state.description || this.props.auth.user.description,
      username: this.state.username || this.props.auth.user.username,
      id: this.state.id || this.props.auth.user.id,
      gender: this.state.gender || this.props.auth.user.gender,
      body_type: this.state.body_type || this.props.auth.user.body_type,
      relationship: this.state.relationship || this.props.auth.user.relationship,
      age: this.state.age || this.props.auth.user.age,
      publicId: this.state.publicId || this.props.auth.user.publicId,
    }

    await this.props.mutate({
      variables: updatedUserInfo,
    });
    
    await this.props.setCurrentUser(updatedUserInfo); 
  }


  render() {
    return (
      <div>
        <h1>{this.props.auth.user.username}</h1>
        { this.state.edit && this.state.oldPhoto ? <UploadUser id={this.props.auth.user.id} getUpdatedPhoto={this.getUpdatedPhoto} /> : <Image cloudName="travelwme" publicId={this.state.publicId ||  this.props.auth.user.publicId} /> }
        <ul>
          { this.state.edit ?
            <Select
              title="Gender"
              name="gender"
              placeholder={this.props.auth.user.gender ? this.props.auth.user.gender : 'choose a answer'}
              handleFunc={this.handleInputChange}
              options={this.state.genderOptions}
              selectedOption={this.state.gender}
          />
          : <div>Gender: { this.props.auth.user.gender ? this.props.auth.user.gender : ''}</div>
            }
          { this.state.edit ?
            <Select
              title="Body_type"
              name="body_type"
              placeholder={this.props.auth.user.body_type ? this.props.auth.user.body_type : 'choose a answer'}
              handleFunc={this.handleInputChange}
              options={this.state.body_typeOptions}
              selectedOption={this.state.body_type}
            />
          : <div>Body_type: {this.props.auth.user.body_type ? this.props.auth.user.body_type : ''}</div>
          }
          { this.state.edit ?
            <Select
              title="Relationship"
              name="relationship"
              placeholder={this.props.auth.user.relationship ? this.props.auth.user.relationship : 'choose a answer'}
              handleFunc={this.handleInputChange}
              options={this.state.relationshipOptions}
              selectedOption={this.state.relationship}
            />
          : <div>Relationship: {this.props.auth.user.relationship ? this.props.auth.user.relationship : ''}</div>
          }
          { this.state.edit ? 
            <Select
              title="Age"
              name="age"
              placeholder={this.props.auth.user.age ? this.props.auth.user.age : 18}
              handleFunc={this.handleInputChange}
              options={this.state.ageOptions}
              selectedOption={this.state.age}
            />
          : <div>Age: {this.props.auth.user.age}</div>
          }
          { this.state.edit ? 
            <TextArea 
              type="text"
              title="About me:"
              rows={6}
              name="description"
              content={this.state.description}
              handleFunc={this.handleInputChange}
              placeholder={this.props.auth.user.description ? this.props.auth.user.description : `lease tell your future travel mates a 
              little bit about yourself`}
            />
          : <div>About me: 
            <p>{this.props.auth.user.description ? this.props.auth.user.description : ''}</p>
            </div>
          }
        </ul>
        {this.state.edit ? <button onClick={this.handdleUpdateProfile}>Update Profile</button> : <button onClick={() => (this.setState({ edit: true }))} >Edit</button>}
      </div>
    );
  }
}



// updateUser(id: Int!, username: String!, email: String!, gender: String!, age: Int!, body_type: Int!, relationship: String!, description: String!): [Int!]!
const updateUser = gql`
mutation updateUser($id: Int!, $username: String!, $gender: String!, $age: Int!, $body_type: String!, $relationship: String!, $description: String!) {
  updateUser(id: $id, username: $username, gender: $gender, age: $age, body_type: $body_type, relationship: $relationship, description: $description)
}
`;

const profileWithMutation = graphql(updateUser)(Profile);

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setCurrentUser }, dispatch);
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(profileWithMutation);




// average', 'atheltic', 'sexy', 'well-rounded'
// const convert = (body) => {
//   if (body === 'average') {
//     return 1;
//   } 
//   if (body === 'atheltic') {
//     return 3;
//   }
//   if (body === 'sexy') {
//     return 12;
//   }
//   if (body === 'well-rounds') {
//     return 7;
//   }
//   if (body === 1) {
//     return 'average';
//   } 
//   if (body === 3) {
//     return 'atheltic';
//   }
//   if (body === 12) {
//     return 'sexy';
//   }
//   if (body ===  7) {
//     return 'well-rounds';
//   }
// }





// export default Profile;

// Desk for tomorrow
  // 1. learn how to upload and store/retrive image into/from database
  // 2. Final draft the user info fieids and modify user related schema and resolvers accodringly
  // 3. Untilize GraphQL and Redux to front load and store data
  // 4. complete the profile component 

//  const login = gql`
// mutation login($email: String!, $password: String!) {
//   login(email: $email, password: $password) 
// }
// `;

// async handleLoginSubmit(e) {
//   e.preventDefault();
//   const {
//     email,
//     password,
//   } = this.state;

//   if (email === '' || password === '') {
//     return;
//   }

//   const token = await this.props.mutate({
//     variables: {
//       email,
//       password,
//     },
//   });

//   if (token) {
//     localStorage.setItem('token', token.data.login);
//     const decodedToken = decode(token.data.login);
//     this.props.setCurrentUser(decodedToken.user);
//     this.props.history.push('/');
//   }
// }
