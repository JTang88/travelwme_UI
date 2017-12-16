import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
import { create } from 'domain';
// import OneInput from '../FormComponents/OneInput';


// import { select } from 'async';

class PlanTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cost: 0,
      dateStart: '',
      dateEnd: '',
      genderOptions: ['F','M','Other','Non-Binary'],
      genderSelected: '',
      ageRange: [25, 35, 45],
      ageSelected: 0,
      fitnessOptions:['average', 'sexy', 'couch potato', 'athletic'],
      fitnessSelected: '',
      relationshipOptions: ['single', 'commited', 'free love', 'it\'s complicated','married'],
      relationshipSelected: '',
      // keywordOptions: [],
      // selectedKeys: [],
      // tripStatus: "Open",
      // userType: "C"
      key: 'test'
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.testFunc = this.testFunc.bind(this)
  }

  // componentDidMount{

  // }

  handleInputChange(event) {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change, () => (console.log('state', this.state)));
    
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      // resets all states to it's type
    });
  }
  
  testFunc (){
    this.props.mutate({
      variables: {
        word: this.state.key
      }
    })
    .then(({ data }) => {
      console.log('got data', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }


  render() {
    return (
      <div>
        <form>
          <h1>Plan Trip Form</h1>
          <SingleInput
            type="text"
            name="title"
            title="TRIP TITLE"
            handleFunc={this.handleInputChange}
            content={this.state.title}
            placeholder="Add your trip title here" />
          <TextArea 
            type="text"
            title="Trip Description"
            rows={6}
            name="description"
            content={this.state.description}
            handleFunc={this.handleInputChange}
            placeholder="Describe your trip in a few words."
          />
          <SingleInput
            type="text"
            name="dateStart"
            title="Date Start"
            handleFunc={this.handleInputChange}
            content={this.state.dateStart}
            placeholder="start date" />

          <SingleInput
            type="text"
            name="dateEnd"
            title="Date End"
            handleFunc={this.handleInputChange}
            content={this.state.dateEnd}
            placeholder="end date" />  

          <SingleInput
            type="number"
            name="cost"
            title="Cost"
            handleFunc={this.handleInputChange}
            content={this.state.cost}
            placeholder="cost" />
            
          <Select
            title="Age Range"
            name="ageSelected"
            placeholder="Choose your age range"
            handleFunc={this.handleInputChange}
            // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            options={this.state.ageRange}
            selectedOption={this.state.age}
            />
          <Select
            title="Gender"
            name="genderSelected"
            placeholder="Choose your gender"
            handleFunc={this.handleInputChange}
            // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            options={this.state.genderOptions}
            selectedOption={this.state.gender}
            />
          <Select
            title="Fitness"
            name="fitnessSelected"
            placeholder="Choose your fitness level"
            handleFunc={this.handleInputChange}
            // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            options={this.state.fitnessOptions}
            selectedOption={this.state.fitness}
            />

          <Select
            title="Relationship Status"
            name="relationshipSelected"
            placeholder="Choose your relationship status"
            handleFunc={this.handleInputChange}
            // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            options={this.state.relationshipOptions}
            selectedOption={this.state.relationship}
            />
        </form>
        return <button onClick={this.testFunc}>test</button>
        <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
          <button >Create Trip</button>
        </Link>
      </div>
    );
  }
}
console.log('this is graphql', graphql)
console.log('this is gql', gql)

const addKey = gql`
mutation addKey($word: String) {
  addKey(word: $word){
    id
  }
}
`;

const TestTrip = graphql(addKey)(PlanTrip);
// const PlanTripSaveData = graphql(createTrip)(PlanTrip);

// export default PlanTripSaveData ;
// export default PlanTrip;
export default TestTrip;










// testFunc () {
//     this.props.mutate({
//     variables:{
//       title: this.state.title, 
//       description: this.state.description, 
//       cost: this.state.cost, 
//       date_start: this.state.date_start, 
//       date_end: this.state.date_end, 
//       gender: this.state.genderSelected, 
//       age: this.state.ageSelected, 
//       fitness: this.state.fitnessSelected, 
//       relationship_status: this.state.relationshipSelected, 
//       trip_status: 'open',
//       key1: 'sdaasd', 
//       key2: 'sadsdadas', 
//       key3: 'sadsdadas', 
//       key4: 'sadsdadas', 
//       key5: 'sadsdadas', 
//       key6: 'sadsdadas', 
//       userId: 3,
//     },
//   })
// }





// const createTrip = gql`
// mutation createTrip(
//   $title: String!, 
//   $description: String!, 
//   $cost: Int!, 
//   $date_start: String!, 
//   $date_end: String!, 
//   $gender: String!, 
//   $age: Int!, 
//   $fitness: String!, 
//   $relationship_status: String!, 
//   $trip_state: String!, 
//   $key1: String!, 
//   $key2: String!, 
//   $key3: String!, 
//   $key4: String!, 
//   $key5: String!, 
//   $key6: String!, 
//   $userId: Int!){
//     createTrip(
//       title: $title, 
//       description: $description, 
//       cost: $cost, 
//       date_start: $date_start, 
//       date_end: $date_end, 
//       gender: $gender, 
//       age: $age, 
//       fitness: $fitness, 
//       relationship_status: $relationship_status, 
//       trip_status: $trip_status, 
//       key1: $key1, 
//       key2: $key2, 
//       key3: $key3, 
//       key4: $key4, 
//       key5: $key5, 
//       key6: $key6, 
//       userId: $userId) {
//         id
//       }
//   }`;
