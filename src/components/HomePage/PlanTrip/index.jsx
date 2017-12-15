import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SingleInput from '../FormComponents/SingleInput';
import TextArea from '../FormComponents/TextArea';
import Select from '../FormComponents/Select';
// import OneInput from '../FormComponents/OneInput';


// import { select } from 'async';

class PlanTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cost: '',
      dateStart: 0,
      dateEnd: 0,
      genderOptions: ['F','M','Other','Non-Binary'],
      genderSelected: '',
      ageRange: ["ada","sadas", "asdsad"],
      ageSelected: '',
      fitnessOptions:['average', 'sexy', 'couch potato', 'athletic'],
      fitnessSelected: '',
      relationshipOptions: ['single', 'commited', 'free love', 'it\'s complicated','married'],
      relationshipSelected: '',
      // keywordOptions: [],
      // selectedKeys: [],
      // tripStatus: "Open",
      // userType: "C"
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
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
  


  render() {
    return (
      <div>
        <form>
          <h1>Plan Trip Form</h1>
          {/* <textarea value={this.state.description} onChange={this.handleDesc}/> */}
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
            type="text"
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
        
        <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
          <button>Create Trip</button>
        </Link>
      </div>
    );
  }
}
export default PlanTrip;
