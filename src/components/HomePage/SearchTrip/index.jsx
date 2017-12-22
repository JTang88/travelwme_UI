import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { create } from 'domain';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
import FoundTrip from '../SearchComponents/FoundTrip';
import RadioGroup from '../FormComponents/RadioGroup';
import UploadTrip from '../FormComponents/UploadTrip';
import foundTrip from '../../../actions/foundTripsAction';

// console.log('this.props.foundTrip= ', this.props.foundTrip);
// console.log('this.props= ', this.props)

// import { select } from 'async';

class SearchTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costStart: 0,
      costEnd: 0,
      dateStart: '',
      dateEnd: '',
      keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian' , 'Luxury'],
      keys: [],
      searched: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleKeywordSelection = this.handleKeywordSelection.bind(this);
    this.changeSearched = this.changeSearched.bind(this)
  }

  

  handleInputChange(event) {
    const change = {};
    const value = event.target.value;
    change[event.target.name] = value;
    this.setState(change, () => (console.log('state', this.state))); 
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
  
  changeSearched() {
    console.log('at search trip, foundTrip', foundTrip)
    this.setState({
      searched: true,
    });
    // const { costStart, costEnd, dateStart, dateEnd, keys } = this.state;

    const searchTerms = {
      costStart: this.state.costStart, 
      costEnd: JSON.parse(this.state.costEnd), 
      dateStart: this.state.dateStart, 
      dateEnd: this.state.dateEnd, 
      keys: this.state.keys,
    }
    console.log('these are the searchTerms= ', searchTerms)
    this.props.foundTrip({ searchTerms });
  }


  render() {
    
    let Searched = this.state.searched;

    if (!Searched) {
      return (
        //while searched is false
        <div>
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
              name="costStart"
              title="Minimum Cost"
              handleFunc={this.handleInputChange}
              content={this.state.costStart}
              placeholder="0" />

            <SingleInput
              type="number"
              name="costEnd"
              title="Maximum Cost"
              handleFunc={this.handleInputChange}
              content={this.state.costEnd}
              placeholder="10,000" />  

            <RadioGroup
              title="Who do you want to be on this trip?"
              setName="keys"
              handleFunc={this.handleKeywordSelection}
              type="radio"
              options={this.state.keywordOptions}
              selectedOptions={this.state.keys}
              
              />
          </form>
          
          <button onClick={this.changeSearched}>Search Trip</button>
        
        </div>
        </div>
      );
    }
    if (Searched) {
      return (
        <FoundTrip  />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    found: state.found,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ foundTrip }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SearchTrip);

