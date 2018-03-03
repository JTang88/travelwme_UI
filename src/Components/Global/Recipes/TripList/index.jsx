import React from 'react'; 
import { Link } from 'react-router-dom';
 
const TripList = ({ trips }) => (
  <div>
    { 
      trips.map(trip => (
        <div key={trip.id} >
          <div>
            <Link to={`homepage/trips/tripinfo/${trip.id}`} href={`homepage/trips/tripinfo/${trip.id}`}>
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