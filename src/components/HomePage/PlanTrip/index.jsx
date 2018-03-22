import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SingleInput from '../../Global/Forms/SingleInput';
import TextArea from '../../Global/Forms/TextArea';
import Select from '../../Global/Forms/Select';
import getCreatedTrips from '../../../graphql/queries/getCreatedTrips';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import RadioGroup from '../../Global/Forms/RadioGroup';
import createTrip from '../../../graphql/mutations/createTrip';

class PlanTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cost: 0,
      dateStart: '',
      dateEnd: '',
      genderOptions: ['female', 'male', 'all'],
      genderSelected: '',
      ageRangeStart: [18, 25, 30, 35, 40, 45],
      ageRangeEnd: [25, 30, 35, 40, 45, 50], 
      ageStartSelected: 0,
      ageEndSelected: 0,
      fitnessOptions: ['average', 'sexy', 'well-rounded', 'athletic'],
      body_types: [],
      relationshipOptions: ['single', 'commited', 'it\'s complicated', 'married'],
      relationshipSelected: '',
      keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian', 'Luxury'],
      keys: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBodyTypeSelection = this.handleBodyTypeSelection.bind(this);
    this.handleKeywordSelection = this.handleKeywordSelection.bind(this);
  }

  handleBodyTypeSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.body_types.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.body_types.filter(s => s !== newSelection);
    } else {
      newSelectionArray = [...this.state.body_types, newSelection];
    }
    this.setState({ body_types: newSelectionArray }, () => console.log('selection', this.state));
  }


  handleKeywordSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.keys.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.keys.filter(s => s !== newSelection);
    } else {
      newSelectionArray = [...this.state.keys, newSelection];
    }
    this.setState({ keys: newSelectionArray }, () => console.log('selection', this.state));
  }

  handleInputChange(event) {
    const change = {};
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    change[event.target.name] = value;
    this.setState(change, () => (console.log('state', this.state)));
  }

  handleSubmit() {
    this.props.createTripMutation({
      refetchQueries: [{
        query: getCreatedTrips,
        variables: { id: this.props.getCurrentUserQuery.getCurrentUser.id },
      }],
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
        creatorId: this.props.getCurrentUserQuery.getCurrentUser.id,
        interesters: 0,
        joiners: 0,
        forSureGoing: 1,
        keys: JSON.stringify(this.state.keys),
        body_types: JSON.stringify(this.state.body_types),
        trip_keywords: JSON.stringify(this.state.keys),
      },
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Plan Trip Form</h1>
        <div className="row">
          <div className="col-md-12 text-center">
            <form className="formplan">
              <SingleInput
                type="text"
                name="title"
                title="TRIP TITLE"
                handleFunc={this.handleInputChange}
                content={this.state.title}
                placeholder="Add your trip title here"
              />
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
                placeholder="start date"
              />

              <SingleInput
                type="text"
                name="dateEnd"
                title="Date End"
                handleFunc={this.handleInputChange}
                content={this.state.dateEnd}
                placeholder="end date"
              />  

              <SingleInput
                type="number"
                name="cost"
                title="Cost"
                handleFunc={this.handleInputChange}
                content={this.state.cost}
                placeholder="cost"
              />
            
              <Select
                title="Age Range"
                name="ageStartSelected"
                placeholder="Choose your age range"
                handleFunc={this.handleInputChange}
                options={this.state.ageRangeStart}
                selectedOption={this.state.age}
              />
              <Select
                name="ageEndSelected"
                placeholder="Choose your age range"
                handleFunc={this.handleInputChange}
                options={this.state.ageRangeEnd}
                selectedOption={this.state.age}
              />
              <Select
                title="Relationship Status"
                name="relationshipSelected"
                placeholder="Choose your relationship status"
                handleFunc={this.handleInputChange}
                options={this.state.relationshipOptions}
                selectedOption={this.state.relationship}
              />
              <Select
                title="Gender"
                name="genderSelected"
                placeholder="Choose your gender"
                handleFunc={this.handleInputChange}
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
            </form>
            <Link to="/" href="/">
              <button className="btn btn-outline-info text-center" onClick={this.handleSubmit}>Create Trip</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const WrapedPlanTrip = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(createTrip, {
    name: 'createTripMutation',
  }),
)(PlanTrip);

export default WrapedPlanTrip;

