import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import SingleInput from '../../Global/Forms/SingleInput';
import RadioGroup from '../../Global/Forms/RadioGroup';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import { searchState } from '../../../graphql/queries/searchState';
import { updateCurrentSearchTerms } from '../../../graphql/mutations/updateCurrentSearchTerms';
import { updateSearchState } from '../../../graphql/mutations/updateSearchState';
import Select from '../../Global/Forms/Select';
import { countries, continents } from '../../../services/country-continent';


class SearchTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costStart: 0,
      costEnd: 0,
      dateStart: '',
      dateEnd: '',
      keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian', 'Luxury'],
      keys: [],
      searchByOptions: ['Country', 'Continent'],
      searchBy: '',
      countryOptions: countries,
      country: '',
      continentOptions: continents,
      continent: '',
    };
    this.handleLocationSelection = this.handleLocationSelection.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeywordSelection = this.handleKeywordSelection.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleLocationSelection(e) {
    this.state.searchBy === 'Country' ? 
      this.setState({ country: e.target.value }) : this.setState({ continent: e.target.value });
  }

  handleInputChange(event) {
    const change = {};
    const { value } = event.target;
    change[event.target.name] = value;
    this.setState(change); 
  }
  
  handleKeywordSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.keys.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.keys.filter(s => s !== newSelection);
    } else {
      newSelectionArray = [...this.state.keys, newSelection];
    }
    this.setState({ keys: newSelectionArray });
  }
  
  async handleSearch(e) {
    e.preventDefault();
    const locationField = this.state.searchBy === 'Country' ? 'country' : 'continent';
    const otherLocationField = locationField === 'country' ? 'continent' : 'country';

    const terms = {
      [locationField]: this.state[locationField],
      [otherLocationField]: null,
      userId: this.props.getCurrentUserQuery.getCurrentUser.id,
      cost_start: Number(this.state.costStart), 
      cost_end: Number(this.state.costEnd), 
      date_start: this.state.dateStart, 
      date_end: this.state.dateEnd, 
      keys: JSON.stringify(this.state.keys),
    };
   
    await this.props.updateCurrentSearchTermsMutation({
      variables: {
        ...terms,
      },
    });
 
    this.props.updateSearchStateMutation({
      variables: {
        searched: true, 
      },
    });
    this.props.history.push('/homepage/foundtrips');
  }

  render() {
    return (
      this.props.searchStateQuery.searchState.searched === true ? <Redirect to={{ pathname: '/homepage/foundtrips' }} /> : 
      <div>
        <div>
          <form>
            <h1>Search Form</h1>
            <Select
              name="searchBySelected"
              placeholder="Search by country or continent"
              handleFunc={e => this.setState({ searchBy: e.target.value })}
              options={this.state.searchByOptions}
              selectedOptions={this.state.searchBy}
            /> 
            {
              this.state.searchBy === 'Country' ?
                <Select
                  name="countriesSelected"
                  placeholder="select a country"
                  handleFunc={this.handleLocationSelection}
                  options={this.state.countryOptions}
                  selectedOptions={this.state.countries}
                /> : 
              this.state.searchBy === 'Continent' ?
                <Select
                  name="continentSelected"
                  placeholder="select a countinent"
                  handleFunc={this.handleLocationSelection}
                  options={this.state.continentOptions}
                  selectedOptions={this.state.continent}
                /> : ''
            }
        
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
              name="costStart"
              title="Minimum Cost"
              handleFunc={this.handleInputChange}
              content={this.state.costStart}
              placeholder="0" 
            />
            <SingleInput
              type="number"
              name="costEnd"
              title="Maximum Cost"
              handleFunc={this.handleInputChange}
              content={this.state.costEnd}
              placeholder="10,000" 
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
          <button className="btn btn-outline-info" onClick={this.handleSearch}>Search Trip</button>
        </div>
      </div>
    );
  }
}


const WrapedSearchTrips = compose(
  graphql(updateCurrentSearchTerms, {
    name: 'updateCurrentSearchTermsMutation',
  }),
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(searchState, {
    name: 'searchStateQuery',
  }),
  graphql(updateSearchState, {
    name: 'updateSearchStateMutation',
  }),
)(SearchTrips);

export default WrapedSearchTrips;
