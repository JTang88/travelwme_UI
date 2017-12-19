import React from 'react';
import Select from '../FormComponents/Select';
import TextArea from '../FormComponents/TextArea';

const FakeUser = {
  id: 1,
  username: 'Jerry Tang',
  age: 29,
  gender: 'male',
  body_type: 'sexy',
  relationship: 'single',
  description: 'I am a creazy person',
};
  

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
      fitnessOptions: ['average', 'atheltic', 'sexy', 'well-rounded'],
      gender: '',
      body_type: '',
      relationship: '',
      age: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handdleUpdateProfile = this.handdleUpdateProfile.bind(this);
  }

  handleInputChange(event) {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change);   
  }
  
  handdleUpdateProfile() {
    this.setState({ edit: false });
    console.log(this.state);
    // this function needs to call the mutaiton and pass in all the variables
  
    

  }


  render() {
    return (
      <div>
        <h1>{FakeUser.username}</h1>
        <ul>
          { this.state.edit ?
            <Select
              title="Gender"
              name="gender"
              placeholder={FakeUser.gender ? FakeUser.gender : 'choose a answer'}
              handleFunc={this.handleInputChange}
              options={this.state.genderOptions}
              selectedOption={this.state.gender}
          />
          : <div>Gender: { FakeUser.gender ? FakeUser.gender : ''}</div>
            }
          { this.state.edit ?
            <Select
              title="Body_type"
              name="body_type"
              placeholder={FakeUser.body_type ? FakeUser.body_type : 'choose a answer'}
              handleFunc={this.handleInputChange}
              options={this.state.fitnessOptions}
              selectedOption={this.state.fitness}
            />
          : <div>Body_type: {FakeUser.body_type ? FakeUser.body_type : ''}</div>
          }
          { this.state.edit ?
            <Select
              title="Relationship"
              name="relationship"
              placeholder={FakeUser.relationship ? FakeUser.relationship : 'choose a answer'}
              handleFunc={this.handleInputChange}
              options={this.state.relationshipOptions}
              selectedOption={this.state.relationship}
            />
          : <div>Relationship: {FakeUser.relationship ? FakeUser.relationship : ''}</div>
          }
          { this.state.edit ? 
            <Select
              title="Age"
              name="age"
              placeholder={FakeUser.age ? FakeUser.age : 18}
              handleFunc={this.handleInputChange}
              options={this.state.ageOptions}
              selectedOption={this.state.age}
            />
          : <div>Age: {FakeUser.age}</div>
          }
          { this.state.edit ? 
            <TextArea 
              type="text"
              title="About me:"
              rows={6}
              name="description"
              content=""
              handleFunc={this.handleInputChange}
              placeholder={FakeUser.description ? FakeUser.description : `lease tell your future travel mates a 
              little bit about yourself`}
            />
          : <div>About me: 
            <p>{FakeUser.description ? FakeUser.description : ''}</p>
            </div>
          }
        </ul>
        {this.state.edit ? <button onClick={this.handdleUpdateProfile}>Update Profile</button> : <button onClick={() => (this.setState({ edit: true }))} >Edit</button>}
      </div>
    );
  }
}


// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }







export default Profile;

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