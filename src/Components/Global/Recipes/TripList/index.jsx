import React, { Component } from 'react'; 
import { graphql } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { updateSearchState } from '../../../../graphql/mutations/updateSearchState';


class TripList extends Component {
  constructor(props) {
    super(props);
    this.handleNewSearch = this.handleNewSearch.bind(this);
  }

  async handleNewSearch(e) {
    e.preventDefault();
    await this.props.mutate({
      variables: {
        searched: false,
      },
    });
    this.props.history.push('/homepage/searchtrips');
  }

  render() {
    const tripType = this.props.from === '/homepage' ? 'trend' : this.props.from === '/homepage/created' ? 'created' :
      this.props.from === '/homepage/joined' ? 'joined' : this.props.from === '/homepage/going' ? 'going' :
        this.props.from === '/homepage/waiting' ? 'waiting' : 'found';
    return (
      <div>
        { 
          this.props.trips.map((trip) => { 
            return (trip.id > 0 && trip.trip_status === 'open') || (trip.id > 0 && trip.trip_status === 'close' && tripType === 'created') ? (
              <div key={`tripList${trip.id}`} >
                <div>
                  <Image cloudName="travelwme" publicId={trip.creator.publicId} /> 
                  <Link to={`/homepage/${tripType}/tripinfo/${trip.id}`} href={`/homepage/${tripType}/tripinfo/${trip.id}`}>
                    <h3>{trip.title}</h3>
                    <div>
                      <ul>
                        <li>{`Come join ${trip.creator.username} for a trip to ${JSON.parse(trip.countries).join(' ')}`} </li>
                        <li>From: {trip.date_start}</li>
                        <li>To: {trip.date_end}</li>
                        <li>Cost {trip.cost}</li>
                        <li>{trip.interesters} travelers are interested</li>
                        <li>{trip.joiners} travelers have joined the trip</li>
                        <li>{trip.forSureGoing} travelers are for sure going </li>
                      </ul>
                    </div>
                  </Link>
                </div>
              </div>
            ) : '';
          }) 
        }
        {
          this.props.from === '/homepage/foundtrips' ? <button onClick={this.handleNewSearch}>New Search</button> : ''
        }
      </div>
    );
  }
} 


export default graphql(updateSearchState)(TripList);