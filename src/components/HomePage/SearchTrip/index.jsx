import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
import { create } from 'domain';
import FoundTrip from '../SearchComponents/FoundTrip';
import RadioGroup from '../FormComponents/RadioGroup';
import UploadTrip from '../FormComponents/UploadTrip';


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
      keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian' , 'Luxury'],
      keys: [],
      fitnessOptions:['average', 'sexy', 'well-rounded', 'athletic'],
      body_types: [],
      
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleBodyTypeSelection = this.handleBodyTypeSelection.bind(this);
    this.handleKeywordSelection = this.handleKeywordSelection.bind(this);
  }

  

  handleInputChange(event) {
    const change = {};
    const value = event.target.value;
    change[event.target.name] = value;
    this.setState(change, () => (console.log('state', this.state))); 
  }


  handleBodyTypeSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.body_types.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.body_types.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.body_types, newSelection];
		}
		this.setState({ body_types: newSelectionArray }, () => console.log('selection', this.state.body_types));
  }
  
  handleKeywordSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.keys.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.keys.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.keys, newSelection];
		}
		this.setState({ keys: newSelectionArray }, () => console.log('selection', this.state.keys));
	}

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      // resets all states to it's type
    });
  }
  
 


  render() {
    // console.log('searched', this.props.data)
    return (
      <div>
      <div>
        <Switch>
          <Route path="/homepage/searchtrip/searchcomponents/foundtrip" component={FoundTrip} />
        </Switch>
      </div>
      <div>
        <form>
          <h1>Search Form</h1>
          <SingleInput
            type="text"
            name="date_start"
            title="Date Start"
            handleFunc={this.handleInputChange}
            content={this.state.dateStart}
            placeholder="start date" />

          <SingleInput
            type="text"
            name="date_end"
            title="Date End"
            handleFunc={this.handleInputChange}
            content={this.state.dateEnd}
            placeholder="end date" />  

          <RadioGroup
            title="Who can go on this trip?"
            setName="body_types"
            handleFunc={this.handleBodyTypeSelection}
            type="radio"
            options={this.state.fitnessOptions}
            selectedOptions={this.state.body_types}
            />
          <RadioGroup
            title="Who do you want to be on this trip?"
            setName="keys"
            handleFunc={this.handleKeywordSelection}
            type="radio"
            options={this.state.keywordOptions}
            selectedOptions={this.state.keys}
            />
        </form>
        
      
        <Link to="/homepage/searchtrip/searchcomponents/foundtrip" href="/homepage/searchtrip/searchcomponents/foundtrip">
          <button >Search Trip</button>
        </Link>
      </div>
      </div>
    );
  }
}

const searchTrip = gql`
query searchTrip(
  $cost_start: Int,
  $cost_end: Int,
  $date_start: String, 
  $date_end: String, 
  $gender: String, 
  $age: Int,  
  $relationship: String,  

  ){
    searchTrip(
      cost_start: $cost_start,
      cost_end: $cost_end,
      date_start: $date_start, 
      date_end: $date_end,  
      gender: $gender, 
      age: $age, 
      relationship: $relationship, 
     
      ){
        id
        title
        description
        gender
        age_start
        relationship
      }
}`;

// const searchTrip = gql`
// query searchTrip(
//   $cost_start: Int,
//   $cost_end: Int 
//   $date_start: String, 
//   $date_end: String, 
//   $gender: String, 
//   $age: Int, 
//   $body_type: String, 
//   $relationship: String,  
//   $keys: String){
//     searchTrip(
//       cost_start: $cost_start,
//       cost_end: $cost_end 
//       date_start: $date_start, 
//       date_end: $date_end, 
//       gender: $gender, 
//       age: $age, 
//       body_type: $body_type, 
//       relationship: $relationship,  
//       keys: $keys){
//         id
//         title
//         description
//         cost
//         date_start
//         date_end
//       }
// }`;

const QueriedTrips = graphql(searchTrip,
  {
    options: props => ({
      variables: {
        date_start: '03-20-2016', 
        date_end: '01-20-2018',
        cost_start: 0,
        cost_end: 4000, 
        gender: 'F', 
        age: 25, 
        relationship: 'single',  

       
      },
    }),
  },
)(SearchTrip);



export default QueriedTrips;


// export default SearchTrip;

