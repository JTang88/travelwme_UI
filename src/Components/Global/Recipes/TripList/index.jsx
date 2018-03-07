import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import updateCurrentTrip from '../../../../graphql/mutations/updateCurrentTrip';

 
class TripList extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(trip, e) {
    e.preventDefault();
    const { id, title, cost, date_start, date_end } = trip;
    this.props.mutate({
      variables: {
        id,
        title,
        cost,
        date_start,
        date_end,
      },
    });
  }
  
  render() {
    return (
      <div>
        { 
          this.props.trips.map(trip => (
            <div key={trip.id} >
              <div onClick={ (e) => this.handleClick(trip, e)}>
                <Link to={`/homepage/trips/tripinfo/${trip.id}`} href={`/homepage/trips/tripinfo/${trip.id}`}>
                  <h3>{trip.title}</h3>
                  <div>
                    <ul>
                      <li>From: {trip.date_start}</li>
                      <li>To: {trip.date_end}</li>
                      <li>Cost {trip.cost}</li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>  
            ))
        } 
      </div>
    );
  }
}

// export default TripList;

const WrapedTripList = graphql(updateCurrentTrip)(TripList);

export default WrapedTripList;