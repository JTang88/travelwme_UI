import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Switch, Typography, withStyles, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import SingleInput from '../../Global/Forms/SingleInput';
import RadioGroup from '../../Global/Forms/RadioGroup';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import { searchState } from '../../../graphql/queries/searchState';
import { updateCurrentSearchTerms } from '../../../graphql/mutations/updateCurrentSearchTerms';
import { updateSearchState } from '../../../graphql/mutations/updateSearchState';
// import Select from '../../Global/Forms/Select';
import { countries, continents } from '../../../services/country-continent';
import GeneralHeader from '../GeneralHeader';
import './index.css'


const styles = {
  cc: {
    position: 'absolute',
    top: '33%',
    left: '43%',
  },  
  switch: {
    position: 'absolute',
    top: '5%',
    right: '42%',
  },
  formBox: {
    mrginTop: 30,
  }
}

class SearchTrips extends Component {
  state = {
    costStart: 0,
    costEnd: Infinity,
    dateStart: '',
    dateEnd: '',
    keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian', 'Luxury'],
    keys: [],
    searchByOptions: ['Country', 'Continent'],
    searchBy: 'Continent',
    countryOptions: countries,
    country: 'Brazil',
    continentOptions: continents,
    continent: 'South America',
    checkedA: true,
    checkedB: false,
  };


  handleLocationSelection = (e) => {
    this.state.searchBy === 'Country' ?
      this.setState({ country: e.target.value }) : this.setState({ continent: e.target.value });
  }


  handleChangeSwitch = name => event => {
    if (name === 'checkedA') {
      this.setState({ 
        checkedA: event.target.checked, 
        checkedB: !event.target.checked,
        searchBy: event.target.checked ? 'Continent' : 'Country'
      });
    } else if (name === 'checkedB') {
      this.setState({
        checkedB: event.target.checked,
        checkedA: !event.target.checked,
        searchBy: event.target.checked ? 'Country' : 'Continent'
      });
    } 
  };

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, console.log(this.state));
  }

  handleKeywordSelection = (e) => {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.keys.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.keys.filter(s => s !== newSelection);
    } else {
      newSelectionArray = [...this.state.keys, newSelection];
    }
    this.setState({ keys: newSelectionArray });
  }

  handleSearch = async (e) => {
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
    const { classes } = this.props;
    return (
      this.props.searchStateQuery.searchState.searched === true ?
        <Redirect to={{ pathname: '/homepage/foundtrips' }} /> :
        <div>
          <GeneralHeader>
            Search Trips
            </GeneralHeader>
          <div className="search-container">
            <div>
              <div>
                <Typography variant="body2" color="inherit">
                  Search by
                </Typography>
                <div className="continent-country-container">
                  <Typography variant="body2" color="inherit" className={classes.cc}>
                    Continent
                  </Typography>
                  <Switch
                    className={classes.switch}
                    checked={this.state.checkedA}
                    onChange={this.handleChangeSwitch('checkedA')}
                    value="checkedA"
                  />
                </div>
                <Typography variant="body2" color="inherit">
                  or
                </Typography>
                <div className="continent-country-container">
                  <Typography variant="body2" color="inherit" className={classes.cc}>
                    Country
                  </Typography>
                  <Switch
                    className={classes.switch}
                    checked={this.state.checkedB}
                    onChange={this.handleChangeSwitch('checkedB')}
                    value="checkedB"
                  />
                </div>
              </div>
              <div className="center-right-form">
                {
                  this.state.searchBy === 'Country' ?
                    <div>
                      <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <Select
                          value={this.state.country}
                          fullWidth
                          onChange={this.handleLocationSelection}
                          inputProps={{
                            name: 'country',
                            id: 'country',
                          }}
                        >
                          {
                            this.state.countryOptions.map(country => (
                              <MenuItem value={country}>{country}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div> :
                    <div>
                      <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="continent">Continent</InputLabel>
                        <Select
                          value={this.state.continent}
                          fullWidth
                          onChange={this.handleLocationSelection}
                          inputProps={{
                            name: 'continent',
                            id: 'continent',
                          }}
                        >
                          {
                            this.state.continentOptions.map(continent => (
                              <MenuItem value={continent}>{continent}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                }
                <FormControl required fullWidth margin="normal">
                  <TextField
                    required
                    name="start"
                    id="start"
                    label="Start"
                    type="date"
                    name="dateStart"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl required fullWidth margin="normal">
                  <TextField
                    required
                    name="dateEnd"
                    id="dateEnd"
                    label="End"
                    type="date"
                    name="dateEnd"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl fullWidth required margin="normal">
                  <InputLabel htmlFor="costStart">Minimum Cost</InputLabel>
                  <Select
                    value={this.state.costStart}
                    fullWidth
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'costStart',
                      id: 'costStart',
                    }}
                  >
                    <MenuItem value={0}>$0</MenuItem>
                    <MenuItem value={1000}>$1000</MenuItem>
                    <MenuItem value={5000}>$5000</MenuItem>
                    <MenuItem value={10000}>$10,000</MenuItem>
                    <MenuItem value={20000}>$25,000</MenuItem>
                    <MenuItem value={50000}>$50,000</MenuItem>
                    <MenuItem value={100000}>$100,000</MenuItem>                    
                  </Select>
                </FormControl>
                <FormControl fullWidth required margin="normal">
                  <InputLabel htmlFor="costEnd">Maximum Cost</InputLabel>
                  <Select
                    value={this.state.costEnd}
                    fullWidth
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'costEnd',
                      id: 'costEnd',
                    }}
                  >
                    <MenuItem value={1000}>$1000</MenuItem>
                    <MenuItem value={5000}>$5000</MenuItem>
                    <MenuItem value={10000}>$10,000</MenuItem>
                    <MenuItem value={20000}>$25,000</MenuItem>
                    <MenuItem value={50000}>$50,000</MenuItem>
                    <MenuItem value={100000}>$100,000</MenuItem>
                    <MenuItem value={Infinity}>No Limit</MenuItem>
                  </Select>
                </FormControl>
                <RadioGroup
                  title="Who do you want to be on this trip?"
                  setName="keys"
                  handleFunc={this.handleKeywordSelection}
                  type="radio"
                  options={this.state.keywordOptions}
                  selectedOptions={this.state.keys}
                />
                <button className="btn btn-outline-info" onClick={this.handleSearch}>Search Trip</button>
              </div>
            </div>
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
)(withStyles(styles)(SearchTrips));

export default WrapedSearchTrips;

// import React, { Component } from 'react';
// import { graphql, compose } from 'react-apollo';
// import { Redirect } from 'react-router-dom';
// import SingleInput from '../../Global/Forms/SingleInput';
// import RadioGroup from '../../Global/Forms/RadioGroup';
// import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
// import { searchState } from '../../../graphql/queries/searchState';
// import { updateCurrentSearchTerms } from '../../../graphql/mutations/updateCurrentSearchTerms';
// import { updateSearchState } from '../../../graphql/mutations/updateSearchState';
// import Select from '../../Global/Forms/Select';
// import { countries, continents } from '../../../services/country-continent';
// import './index.css'


// class SearchTrips extends Component {
//   state = {
//     costStart: 0,
//     costEnd: 0,
//     dateStart: '',
//     dateEnd: '',
//     keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian', 'Luxury'],
//     keys: [],
//     searchByOptions: ['Country', 'Continent'],
//     searchBy: '',
//     countryOptions: countries,
//     country: '',
//     continentOptions: continents,
//     continent: '',
//   };
  
  
//   handleLocationSelection = (e) => {
//     this.state.searchBy === 'Country' ? 
//       this.setState({ country: e.target.value }) : this.setState({ continent: e.target.value });
//   }

//   handleInputChange = (event) => {
//     const change = {};
//     const { value } = event.target;
//     change[event.target.name] = value;
//     this.setState(change); 
//   }
  
//   handleKeywordSelection = (e) => {
//     const newSelection = e.target.value;
//     let newSelectionArray;
//     if (this.state.keys.indexOf(newSelection) > -1) {
//       newSelectionArray = this.state.keys.filter(s => s !== newSelection);
//     } else {
//       newSelectionArray = [...this.state.keys, newSelection];
//     }
//     this.setState({ keys: newSelectionArray });
//   }
  
//   handleSearch = async (e) => {
//     e.preventDefault();
//     const locationField = this.state.searchBy === 'Country' ? 'country' : 'continent';
//     const otherLocationField = locationField === 'country' ? 'continent' : 'country';

//     const terms = {
//       [locationField]: this.state[locationField],
//       [otherLocationField]: null,
//       userId: this.props.getCurrentUserQuery.getCurrentUser.id,
//       cost_start: Number(this.state.costStart), 
//       cost_end: Number(this.state.costEnd), 
//       date_start: this.state.dateStart, 
//       date_end: this.state.dateEnd, 
//       keys: JSON.stringify(this.state.keys),
//     };
   
//     await this.props.updateCurrentSearchTermsMutation({
//       variables: {
//         ...terms,
//       },
//     });
 
//     this.props.updateSearchStateMutation({
//       variables: {
//         searched: true, 
//       },
//     });
//     this.props.history.push('/homepage/foundtrips');
//   }

//   render() {
//     return (
//       this.props.searchStateQuery.searchState.searched === true ? 
//         <Redirect to={{ pathname: '/homepage/foundtrips' }} /> : 
//       <div>
//         <div>
//           <form>
//             <h1>Search Form</h1>
//             <Select
//               name="searchBySelected"
//               placeholder="Search by country or continent"
//               handleFunc={e => this.setState({ searchBy: e.target.value })}
//               options={this.state.searchByOptions}
//               selectedOptions={this.state.searchBy}
//             /> 
//             {
//               this.state.searchBy === 'Country' ?
//                 <Select
//                   name="countriesSelected"
//                   placeholder="select a country"
//                   handleFunc={this.handleLocationSelection}
//                   options={this.state.countryOptions}
//                   selectedOptions={this.state.countries}
//                 /> : 
//               this.state.searchBy === 'Continent' ?
//                 <Select
//                   name="continentSelected"
//                   placeholder="select a countinent"
//                   handleFunc={this.handleLocationSelection}
//                   options={this.state.continentOptions}
//                   selectedOptions={this.state.continent}
//                 /> : ''
//             }
        
//             <SingleInput
//               type="text"
//               name="dateStart"
//               title="Date Start"
//               handleFunc={this.handleInputChange}
//               content={this.state.dateStart}
//               placeholder="start date" 
//             />
//             <SingleInput
//               type="text"
//               name="dateEnd"
//               title="Date End"
//               handleFunc={this.handleInputChange}
//               content={this.state.dateEnd}
//               placeholder="end date" 
//             />  
//             <SingleInput
//               type="number"
//               name="costStart"
//               title="Minimum Cost"
//               handleFunc={this.handleInputChange}
//               content={this.state.costStart}
//               placeholder="0" 
//             />
//             <SingleInput
//               type="number"
//               name="costEnd"
//               title="Maximum Cost"
//               handleFunc={this.handleInputChange}
//               content={this.state.costEnd}
//               placeholder="10,000" 
//             />  
//             <RadioGroup
//               title="Who do you want to be on this trip?"
//               setName="keys"
//               handleFunc={this.handleKeywordSelection}
//               type="radio"
//               options={this.state.keywordOptions}
//               selectedOptions={this.state.keys}
//             />
//           </form> 
//           <button className="btn btn-outline-info" onClick={this.handleSearch}>Search Trip</button>
//         </div>
//       </div>
//     );
//   }
// }


// const WrapedSearchTrips = compose(
//   graphql(updateCurrentSearchTerms, {
//     name: 'updateCurrentSearchTermsMutation',
//   }),
//   graphql(getCurrentUser, {
//     name: 'getCurrentUserQuery',
//   }),
//   graphql(searchState, {
//     name: 'searchStateQuery',
//   }),
//   graphql(updateSearchState, {
//     name: 'updateSearchStateMutation',
//   }),
// )(SearchTrips);

// export default WrapedSearchTrips;
