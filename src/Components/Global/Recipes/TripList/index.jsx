import React from 'react'; 
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const TripList = props => (
  <div>
    { 
      props.trips.map(trip => (
        <div key={trip.id} >
          <div>
            <Image cloudName="travelwme" publicId={trip.creator.publicId} /> 
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

export default TripList;