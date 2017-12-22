import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class FoundTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      cost_start: 0,
      cost_end: 0,
      date_start: '',
      date_end: '',
      // keys: [],
      age: 0,
      relationship: '',
      
    };
  }

  

  render() {
    console.log('searched at foundtrip', this.props.data )
    return (
      <div>
        {/* {this.props.data.searchTrip.map((trips, idx) =>{
          return(
            // <SearchEntry />
          )
        })} */}
        
      </div>
    );
  }
}


const searchTrip = gql`
query searchTrip(
  $cost_start: Int,
  $cost_end: Int,
  $date_start: String, 
  $date_end: String, 
  $gender: String, 
  $age: Int,  
  $relationship: String,  

  ){
    searchTrip(
      cost_start: $cost_start,
      cost_end: $cost_end,
      date_start: $date_start, 
      date_end: $date_end,  
      gender: $gender, 
      age: $age, 
      relationship: $relationship, 
     
      ){
        id
        title
        description
        gender
        age_start
        relationship
      }
}`;

// const searchTrip = gql`
// query searchTrip(
//   $cost_start: Int,
//   $cost_end: Int 
//   $date_start: String, 
//   $date_end: String, 
//   $gender: String, 
//   $age: Int, 
//   $body_type: String, 
//   $relationship: String,  
//   $keys: String){
//     searchTrip(
//       cost_start: $cost_start,
//       cost_end: $cost_end 
//       date_start: $date_start, 
//       date_end: $date_end, 
//       gender: $gender, 
//       age: $age, 
//       body_type: $body_type, 
//       relationship: $relationship,  
//       keys: $keys){
//         id
//         title
//         description
//         cost
//         date_start
//         date_end
//       }
// }`;

const QueriedTrips = graphql(searchTrip,
  {
    options: props => ({
      variables: {
        date_start: '03-20-2016', 
        date_end: '01-20-2018',
        cost_start: 0,
        cost_end: 4000, 
        gender: 'F', 
        age: 25, 
        relationship: 'single',  

       
      },
    }),
  },
)(FoundTrips);



export default QueriedTrips;

// export default FoundTrips;
