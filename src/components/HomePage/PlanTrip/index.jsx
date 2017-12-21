import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
import RadioGroup from '../FormComponents/RadioGroup';
import { create } from 'domain';
import style from '../FormComponents/style.css'
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
      genderOptions: ['F','M','All'],
      genderSelected: '',
      ageRangeStart:[18, 25, 30, 35, 40, 45],
      ageRangeEnd:[25, 30, 35, 40, 45, 50], 
      ageStartSelected: 0,
      ageEndSelected: 0,
      fitnessOptions:['average', 'sexy', 'couch potato', 'athletic'],
      body_types: [],
      relationshipOptions: ['single', 'commited', 'free love', 'it\'s complicated','married'],
      relationshipSelected: '',
      keywordOptions: [],
      keys: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
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

  
  // handleSubmit() {
  //   this.props.mutate({
  //     variables: {
  //       title: this.state.title,
  //       description: this.state.description,
  //       cost: this.state.cost,
  //       date_start: this.state.dateStart,
  //       date_end: this.state.dateEnd,
  //       gender: this.state.genderSelected, 
  //       age_start: this.state.ageStartSelected,
  //       age_end: this.state.ageEndSelected,
  //       body_types: [2, 3],
  //       relationship: this.state.relationshipSelected,
  //       keys: [1, 2],
  //       userId: 1,
  //     },
  //   });
  // }

  // handleSubmit() {
  //   this.props.mutate({
  //     variables: {
  //       title: 'test trip',
  //       description: 'some description',
  //       cost: 3000,
  //       date_start: '11-12-2017',
  //       date_end: '01-02-2018',
  //       gender: 'All',
  //       age_start: 25,
  //       age_end: 35,
  //       relationship: 'single',
 //        keys: "[1, 2]",
  //       trip_status: 'open',
  //     },
  //   });
  // }
  testFunc(){
  this.props.mutate({
    variables: {
      title: 'TEST FINAL',
      description: 'some description2',
      cost: 3000,
      date_start: '11-12-2017',
      date_end: '01-02-2018',
      gender: 'All',
      age_start: 25,
      age_end: 35,
      relationship: 'single',
      trip_status: 'open',
      userId: 2,
      keys: "[1, 2]",
      body_types: "[1, 2, 3]",
    },
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
            name="ageStartSelected"
            placeholder="Choose your age range"
            handleFunc={this.handleInputChange}
            // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            options={this.state.ageRangeStart}
            selectedOption={this.state.age}
            />
          <Select
            name="ageEndSelected"
            placeholder="Choose your age range"
            handleFunc={this.handleInputChange}
            // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            options={this.state.ageRangeEnd}
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
          <RadioGroup
            // title="Who can go on this trip?"
            // setName="body_types"
            // type="radio"
            // placeholder="Choose your fitness level"
            // handleFunc={this.handleInputChange}
            // // options={this.state.ageSelected ? this.state.ageSelected : this.state.ageRange}
            // options={this.state.fitnessOptions}
            // selectedOption={this.state.fitness}

            title="Who can go on this trip?"
            setName="body_types"
            handleFunc={this.handleInputChange}
            type="radio"
            options={this.state.fitnessOptions}
            selectedOptions={this.state.body_types}
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
            <button onClick={this.testFunc}>test</button>
            {/* <button onClick={this.handleSubmit}>test</button> */}
        <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
          <button >Create Trip</button>
        </Link>
      </div>
    );
  }
}


// const addKey = gql`
// mutation addKey(
//  $word: [Int]) {
//   addKey(word: $word){
//     id
//   }
// }
// `;

const createTrip = gql`
mutation createTrip(
  $title: String!, 
  $description: String!, 
  $cost: Int, 
  $date_start: String, 
  $date_end: String, 
  $gender: String!, 
  $age_start: Int!,
  $age_end: Int!, 
  $relationship: String!, 
  $trip_status: String!,
  $keys: String,
  $body_types: String,
  $userId: Int!) {
    createTrip(
      title: $title, 
      description: $description,
      cost: $cost, 
      date_start: $date_start, 
      date_end: $date_end, 
      gender: $gender, 
      age_start: $age_start,
      age_end: $age_end, 
      relationship: $relationship, 
      trip_status: $trip_status,
      keys: $keys,
      body_types: $body_types,
      userId: $userId){
        id
      } 
  }
  `;

// createTrip(title: String, description: String, cost: Int, date_start: String, date_end: String, gender: String, age_start: Int, age_end: Int, relationship: String, keys: [Int], body_types: [Int], userId: Int): Trip

// const createTrip = gql`
// mutation createTrip(
//   $title: String, 
//   $description: String!, 
//   $cost: Int!, 
//   $date_start: String!, 
//   $date_end: String!, 
//   $gender: String!, 
//   $age_start: Int!,
//   $age_end: Int!, 
//   $relationship: String!,  
//   $keys:[TripKeyword], 
//   $body_types: [Int], 
//   $userId: Int!){
//     createTrip(
//       title: $title, 
//       description: $description, 
//       cost: $cost, 
//       date_start: $date_start, 
//       date_end: $date_end, 
//       gender: $gender, 
//       age_start: $age_start,
//       age_end: $age_end, 
//       relationship: $relationship, 
//       keys: $keys
//       body_types: $body_types,
//       userId: $userId) 
//   }`;

// const TestTrip = graphql(addKey)(PlanTrip);
const PlanTripSaveData = graphql(createTrip)(PlanTrip);

export default PlanTripSaveData;
// export default PlanTrip;
// export default TestTrip;

