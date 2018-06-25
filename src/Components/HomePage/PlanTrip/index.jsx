import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
  Input,
} from '@material-ui/core';
import { graphql, compose } from 'react-apollo';
import { countries, continentTable } from '../../../services/country-continent';
import getCreatedTrips from '../../../graphql/queries/getCreatedTrips';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import GeneralHeader from '../GeneralHeader';
import createTrip from '../../../graphql/mutations/createTrip';
import './index.css';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    maxWidth: 600,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  subs: {
    marginBottom: 40,
    marginTop: 40,
  }, 
  description: {
    width: 630,
    marginLeft: '27%',
    marginRight: '27%',
    marginBottom: 80,
    backgroundColor: 'white',
  }
});

const ageArray = [18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

class PlanTrip extends Component {
  state = {
    ageStart: 18,
    ageEnd: 100,
    title: '',
    description: '',
    cost: '',
    keys: [],
    dateStart: '',
    dateEnd: '',
    gender: '',
    ageStart: 0,
    ageEnd: 0,
    relationship: '',
    keywordOptions: ['Adventurer', 'Backpacker', 'Explorer', 'Gourmet', 'Historian', 'Luxury'],
    countriesOptions: countries,
    keys: [],
    countries: [],
    continents: [],
  }

  handleContriesSelection = (e) => {
    let continents = new Set(e.target.value.map(country => (
      continentTable[country]
    )));
    continents = [...continents];
    this.setState({ 
      countries: e.target.value,
      continents,
    }, console.log(this.state));
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

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value }, console.log(this.state));
  }

  handleKeywordSelection = (e) => {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.keys.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.keys.filter(key => key !== newSelection);
    } else {
      newSelectionArray = [...this.state.keys, newSelection];
    }
    this.setState({
      keys: newSelectionArray,
      [newSelection]: e.target.checked,
    });
  }

  handleSubmit = async () => {
    await this.props.createTripMutation({
      refetchQueries: [{
        query: getCreatedTrips,
        variables: { id: this.props.getCurrentUserQuery.getCurrentUser.id },
      }],
      variables: {
        title: this.state.title,
        description: this.state.description,
        cost: this.state.cost || 0,
        date_start: this.state.dateStart,
        date_end: this.state.dateEnd,
        gender: this.state.gender,
        age_start: this.state.ageStart,
        age_end: this.state.ageEnd,
        relationship: this.state.relationship,
        trip_status: 'open',
        creatorId: this.props.getCurrentUserQuery.getCurrentUser.id,
        interesters: 0,
        joiners: 0,
        forSureGoing: 1,
        countries: JSON.stringify(this.state.countries),
        continents: JSON.stringify(this.state.continents),
        keys: JSON.stringify(this.state.keys),
        trip_keywords: JSON.stringify(this.state.keys),
      },
    });
    this.props.history.push("/homepage/created")
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <GeneralHeader>
          Plan Trip
        </GeneralHeader>
        <div className="plan-trip-container">
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Please select the destinations of this trip
          </Typography>
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="select-multiple">Countries</InputLabel>
              <Select
                multiple
                value={this.state.countries}
                onChange={this.handleContriesSelection}
                input={<Input id="select-multiple" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
                  </div>
                )}
              >
                {countries.map(country => (
                  <MenuItem
                    key={country}
                    value={country}
                    style={{
                      fontWeight:
                        this.state.countries.indexOf(country) === -1
                          ? theme.typography.fontWeightRegular
                          : theme.typography.fontWeightMedium,
                    }}
                  >
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Now give this trip a title
          </Typography>
          <FormControl className={classes.formControl}>
            <TextField
              required
              
              id="title"
              label="Title"
              type="text"
              name="title"
              onChange={this.handleChange}
            />
          </FormControl>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Please provide a estimated cost for this trip, exluding the cost of the plane tickets!
          </Typography>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="adornment-amount">Estimated Cost</InputLabel>
            <Input
              id="adornment-amount"
              value={this.state.cost}
              name="cost"
              onChange={this.handleChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Let's now decide a start and end date for the trip!
          </Typography>
          <div>
            <FormControl required className={classes.formControl} >
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
          </div>
          <div>
            <FormControl required className={classes.formControl} >
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
          </div>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Now, select the age range for your future travel mates
          </Typography>
          <div>
            <FormControl className={classes.formControl} required >
              <InputLabel htmlFor="ageStart">From</InputLabel>
              <Select
                value={this.state.ageStart}
                fullWidth
                onChange={this.handleChange}
                inputProps={{
                  name: 'ageStart',
                  id: 'ageStart',
                }}
              >
                {
                  ageArray.map(age => (
                    <MenuItem value={age}>{age}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} required >
              <InputLabel htmlFor="ageEnd">To</InputLabel>
              <Select
                value={this.state.ageEnd}
                onChange={this.handleChange}
                inputProps={{
                  name: 'ageEnd',
                  id: 'ageEnd',
                }}
              >
                {
                  ageArray.map(age => (
                    <MenuItem value={age}>{age}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Is this trip for singeles, people who are in a relationship, or doesn't matter?
          </Typography>
          <FormControl className={classes.formControl} required >
            <InputLabel htmlFor="relationship">Relationship Status</InputLabel>
            <Select
              value={this.state.relationship}
              onChange={this.handleChange}
              inputProps={{
                name: 'relationship',
                id: 'relationship',
              }}
            >
              <MenuItem value={'single'}>Single</MenuItem>
              <MenuItem value={'in a relationship'}>In a relationship</MenuItem>
              <MenuItem value={'all'}>All relationship Status are Welcome!</MenuItem>
            </Select>
          </FormControl>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Now select the gender for your future travel mates 
          </Typography>
          <FormControl className={classes.formControl} required >
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              value={this.state.gender}
              onChange={this.handleChange}
              inputProps={{
                name: 'gender',
                id: 'gender',
              }}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
              <MenuItem value={'all'}>All Genders are Welcome!</MenuItem>
            </Select>
          </FormControl>
          <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
            Let us know what type of travelers would you like to be on this trip
          </Typography>
          <div>
            <div className="check-box">
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Adventurer}
                        onChange={this.handleKeywordSelection}
                        value="Adventurer"
                      />
                    }
                    label="Adventurer"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Backpacker}
                        onChange={this.handleKeywordSelection}
                        value="Backpacker"
                      />
                    }
                    label="Backpacker"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Explorer}
                        onChange={this.handleKeywordSelection}
                        value="Explorer"
                      />
                    }
                    label="Explorer"
                  />
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Gourmet}
                        onChange={this.handleKeywordSelection}
                        value="Gourmet"
                      />
                    }
                    label="Gourmet"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Historian}
                        onChange={this.handleKeywordSelection}
                        value="Historian"
                      />
                    }
                    label="Historian"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.Luxury}
                        onChange={this.handleKeywordSelection}
                        value="Luxury"
                      />
                    }
                    label="Luxury"
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>
          <div>
            <Typography className={classes.subs} variant="headline" color="primary" gutterBottom>
              Finally, share the details of trip with your future travel mates!
            </Typography>
            <FormControl className={classes.description}>
              <TextField
                id="description"
                label="Details:"
                type="text"
                rows={19}
                multiline
                name="description"
                onChange={this.handleChange}
              />
            </FormControl>
          </div>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="secondary"
            size="large"
          >
            Create Trip
        </Button>
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
)(withStyles(styles, { withTheme: true })(PlanTrip));

export default WrapedPlanTrip;
