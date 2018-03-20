import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import SingleInput from '../../Global/Forms/SingleInput';
import RadioGroup from '../../Global/Forms/RadioGroup';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import { updateCurrentSearchTerms } from '../../../graphql/mutations/updateCurrentSearchTerms';


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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeywordSelection = this.handleKeywordSelection.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  

  handleInputChange(event) {
    const change = {};
    const { value } = event.target;
    change[event.target.name] = value;
    this.setState(change, () => (console.log('state', this.state))); 
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
  
  async handleSearch(e) {
    e.preventDefault();
    console.log('it is hitting handle search');
    const terms = {
      userId: this.props.getCurrentUserQuery.getCurrentUser.id,
      cost_start: Number(this.state.costStart), 
      cost_end: Number(this.state.costEnd), 
      date_start: this.state.dateStart, 
      date_end: this.state.dateEnd, 
      keys: JSON.stringify(this.state.keys),
    };
   
    console.log({...terms});
    await this.props.updateCurrentSearchTermsMutation({
      variables: {
        ...terms,
      },
    });

    this.props.history.push('/homepage/searchtrips/foundtrips');
  }

  render() {
    console.log('here is the props in searchTrips: ', this.props);
    return (
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
)(SearchTrips);

export default WrapedSearchTrips;
