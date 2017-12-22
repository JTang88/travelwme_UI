import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import showTrip from '../../../actions/showTripAction';
import tripCreator from '../../../actions/tripCreatorAction';
import tripTravelers from '../../../actions/tripTravelersAction';
import tripInterested from '../../../actions/tripInterestedAction';
import updateStatus from '../../../actions/tripStatusAction';


class SearchEntry extends React.Component {
  constructor(props) {
    super(props);

    this.setTripAndTravelers = this.setTripAndTravelers.bind(this);
  }
  
  setTripAndTravelers(trip) {
    this.props.showTrip(trip);
    this.props.tripCreator(trip.users);
    this.props.tripTravelers(trip.users);
    this.props.tripInterested(trip.users);
    this.props.updateStatus(trip.trip_status);
  }

  displayListofTrips() {
    let tripRender;

      if (this.props.search.length > 0) {
        tripRender = (
        <div>
          {this.props.search.map(trip =>
            (<div key={trip.id}>
              <h3 onClick={() => this.setTripAndTravelers(trip)}>
                <Link to="/homepage/trips/tripinfo" href="/homepage/trips/tripinfo" className="nav-item nav-link">
                  {trip.title}
                </Link>
              </h3>
        </div>))}
        </div>)
    }

    return tripRender;
  }

  render() {
    return (
      <div>
        {this.displayListofTrips()}
        <button onClick={() => console.log(this.props)}>
              button
        </button>
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log('state= ', state)
  return {
    auth: state.auth,
    search: state.search,
    found: state.found,
    
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    showTrip, tripCreator, tripTravelers, tripInterested, updateStatus,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchEntry);

// const SearchEntry =({ trip })=>
// // {
  // //   console.log('I am here', trip)
  // //   return
  //   (<div className="card" >
  
  //       <div>
  //       <Image cloudName="travelwme" publicId={trip.publicId} />
  //         </div>     
  
  //        <div className="card-title">     
  //       <Link to="/sign" href="/sign">{trip.title}</Link>
  //       </div>
  //       <div className="card-text">
  //         Cost: <h4>{trip.cost}</h4>
  //         Date range: <h4>{trip.date_start}</h4>-<h4> {trip.date_start}</h4>
  //         <h4>{trip.description}</h4>
  //       </div>  
  
  
  
  //   </div>
  //   )
  // };