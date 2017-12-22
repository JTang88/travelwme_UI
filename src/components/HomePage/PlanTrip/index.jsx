import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
import RadioGroup from '../FormComponents/RadioGroup';
import { create } from 'domain';
// import style from '../FormComponents/style.css';
import UploadTrip from '../FormComponents/UploadTrip';
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
      fitnessOptions:['average', 'sexy', 'well-rounded', 'athletic'],
      body_types: [],
      relationshipOptions: ['single', 'commited', 'free love', 'it\'s complicated','married'],
      relationshipSelected: '',
      keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian' , 'Luxury'],
      keys: [],
      publicId: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBodyTypeSelection = this.handleBodyTypeSelection.bind(this);
    this.handleKeywordSelection = this.handleKeywordSelection.bind(this);
    this.testFunc = this.testFunc.bind(this)
    this.getpublicId = this.getpublicId.bind(this);
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

 getpublicId (pid) {
   this.setState({
      publicId: pid
   })
 }

 handleSubmit(){
  this.props.mutate({
    variables: {
      title: this.state.title,
      description: this.state.description,
      cost: this.state.cost,
      date_start: this.state.dateStart,
      date_end: this.state.dateEnd,
      gender: this.state.genderSelected,
      age_start: this.state.ageStartSelected,
      age_end: this.state.ageEndSelected,
      relationship: this.state.relationshipSelected,
      trip_status: 'open',
      userId: 2,
      keys: JSON.stringify(this.state.keys),
      body_types: JSON.stringify(this.state.body_types),
      publicId: this.state.publicId,
    },
  });
  }

  testFunc(){
  this.props.mutate({
    variables: {
      title: 'TEST FINAL',
      description: 'some description2',
      cost: 2000,
      date_start: '11-12-2017',
      date_end: '01-02-2018',
      gender: 'All',
      age_start: 25,
      age_end: 35,
      relationship: 'single',
      trip_status: 'open',
      userId: 2,
      keys: JSON.stringify([1, 2]),
      body_types: JSON.stringify([1, 2, 3]),
      publicId: this.state.publicId,
    },
  });
  }


  render() {
    return (
      <div className="row">
        <div className='col-md-4'>
          <UploadTrip getpublicId={this.getpublicId}/>
        </div>
        <form className='col-md-8'>
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
        <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
          <button onClick={this.handleSubmit}>Create Trip</button>
        </Link>
      </div>
    );
  }
}


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
  $userId: Int!,
  $publicId: String) {
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
      userId: $userId,
      publicId: $publicId){
        id
      } 
  }
  `;


const PlanTripSaveData = graphql(createTrip)(PlanTrip);

export default PlanTripSaveData;


