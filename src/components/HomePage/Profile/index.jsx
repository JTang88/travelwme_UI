import React from 'react';
import Select from '../FormComponents/Select';
import TextArea from '../FormComponents/TextArea';

const FakeUser = {
  username: 'Jerry Tang',
  age: 29,
  gender: '',
  fitness: '',
  relationship: 'single',
  description: 'I am a creazy person',
};
  

class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      ageOptions:
       [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
         40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 
         62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 
         84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
      relationshipOptions: ['single', 'in a relationship', 'open', 'complicated'],
      genderOptions: ['male', 'female'],
      fitnessOptions: ['average', 'atheltic', 'curvey', 'mellow'],

    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change);   
  }
  // if edit === false, just render whatever you get from redux
  render() {
    return (
      <div>
        <h1>{FakeUser.username}</h1>
        <ul>
          { this.state.edit ? 
            <Select
            title="Gender"
            name="genderSelected"
            placeholder={FakeUser.fitness ? FakeUser.fitness : 'choose a answer'}
            handleFunc={this.handleInputChange}
            options={this.state.genderOptions}
            selectedOption={this.state.gender}
          />
          : <div>Gender: { FakeUser.gender ? FakeUser.gender : ''}</div>
            }
          { this.state.edit ? 
            <Select
            title="Fitness"
            name="fitnessSelected"
            placeholder={FakeUser.fitness ? FakeUser.fitness : 'choose a answer'}
            handleFunc={this.handleInputChange}
            options={this.state.fitnessOptions}
            selectedOption={this.state.fitness}
          />
          : <div>Fitness: {FakeUser.fitness ? FakeUser.fitness : ''}</div>
          }
          { this.state.edit ? 
            <Select
            title="Relationship"
            name="relationshipSelected"
            placeholder={FakeUser.fitness ? FakeUser.relationship : 'choose a answer'}
            handleFunc={this.handleInputChange}
            options={this.state.relationshipOptions}
            selectedOption={this.state.relationship}
          />
          : <div>Relationship: {FakeUser.relationship ? FakeUser.relationship : ''}</div>
          }
          { this.state.edit ? 
            <Select
            title="Age"
            name="ageSelected"
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
            content={this.state.description}
            handleFunc={this.handleInputChange}
            placeholder={FakeUser.description ? FakeUser.description : `Yes, it's annoying "about me" again. But please tell your future travel mates a 
            little bit about yourself, we encourage to say something weird about yourself, it would be func:`}
            />
          : <div>About me: 
              <p>{FakeUser.description ? FakeUser.description : ''}</p>
            </div>
          }
        </ul>
      </div>
    );
  }
}

export default Profile;
