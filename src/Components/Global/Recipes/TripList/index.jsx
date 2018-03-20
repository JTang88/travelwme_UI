import React from 'react'; 
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const TripList = (props) => {
  console.log('this is props in TripList: ', props);
  const tripType = props.from === '/homepage' ? 'trend' : 
    props.from === '/homepage/created' ? 'creted' :
      props.from === '/homepage/joined' ? 'joined' :
        props.from === '/homepage/going' ? 'going' :
          props.from === '/homepage/waiting' ? 'waiting' : 'found';
  return props.trips.map((trip) => { 
    return trip.id > 0 ? (
      <div key={trip.id} >
        <div>
          <Image cloudName="travelwme" publicId={trip.creator.publicId} /> 
          <Link to={`/homepage/${tripType}/tripinfo/${trip.id}`} href={`/homepage/${tripType}/tripinfo/${trip.id}`}>
            <h3>{trip.title}</h3>
            <div>
              <ul>
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
  });
};
        

export default TripList;