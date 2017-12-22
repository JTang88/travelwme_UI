import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
import { create } from 'domain';
import FoundTrip from '../SearchComponents/FoundTrip';


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
  }

  

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
        </form>
        
      
        <Link to="/homepage/searchtrip/searchcomponents/foundtrip" href="/homepage/searchtrip/searchcomponents/foundtrip">
          <button >Search Trip</button>
        </Link>
      </div>
      </div>
    );
  }
}


export default SearchTrip;

