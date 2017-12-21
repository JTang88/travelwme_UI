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

const testUser = {
  gender: 'F',
  relationship: 'single',
  age: 26,

}

class SearchTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost_start: 0,
      cost_end: 0,
      date_start: '',
      date_end: '',
      keywordOptions: [],
      keys: []
      
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
    // this.testFunc = this.testFunc.bind(this)
  }

  // componentDidMount{

  // }

  handleInputChange(event) {
    const change = {};
    const value = event.target.value;
    change[event.target.name] = value;
    this.setState(change, () => (console.log('state', this.state)));
    
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      // resets all states to it's type
    });
  }
  
 


  render() {
    return (
      <div>
        <form>
          <h1>Search Form</h1>
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
        {/* <button onClick={this.testFunc}>test</button> */}
        <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
          <button >Search Trip</button>
        </Link>
      </div>
    );
  }
}


// const addKey = gql`
// mutation addKey($word: String) {
//   addKey(word: $word){
//     id
//   }
// }
// `;


// const PlanTripSaveData = graphql(createTrip)(SearchTrip);


export default SearchTrip;
// export default TestTrip;
