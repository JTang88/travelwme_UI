import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import SingleInput from '../FormComponents/SingleInput';
// import TextArea from '../FormComponents/TextArea';
// import Select from '../FormComponents/Select';
// import OneInput from '../FormComponents/OneInput';


// import { select } from 'async';

class PlanTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // title: '',
    //   description: '',

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
    this.setState(change);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      // all states to it's type
    });
  }


  render() {
    return (
      <div>
        <form>
          <h1>Plan Trip Form</h1>
          
          {/* <OneInput 
            type="text"
            name="title"
            placeholder="trip title"
            onChange={this.handleInputChange}
            /> */}
          {/* <SingleInput
            inputType={"text"}
            title={"Trip Title"}
            name={"trip-name"}
            handleFunc={this.handleInputChange}
            content={this.state.title}
            placeholder={"Add your trip title here"} /> */}
        </form>
        <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
          <button>Create Trip</button>
        </Link>
      </div>
    );
  }
}
export default PlanTrip;
