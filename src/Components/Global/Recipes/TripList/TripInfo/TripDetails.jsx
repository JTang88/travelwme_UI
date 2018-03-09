import React from 'react';
import { Image } from 'cloudinary-react';


function TripDetails(props) {
  console.log('code reaches here!!');
  return (
    <div>
      <header className="masthead text-white text-center">
        <div>
          <h1 className="text-uppercase triptit">{props.trip.title}</h1>
        </div>
      </header>
      <div className="row">
        <div className="col-8">
          <Image cloudName="travelwme" className="rounded trippic" publicId={props.trip.creator.publicId} />
        </div>
        <div className="col-4 trippic">
          <h4>Description: {props.trip.description}</h4>
          <h4>Age start: {props.trip.age_start}</h4>
          <h4>Age end: {props.trip.age_end}</h4>
          <h4>Start Date: {props.trip.date_start}</h4>  
          <h4>End Date: {props.trip.date_end}</h4>
          <h4>Gender: {props.trip.gender}</h4>
          <h4>Trip Keywokds: {props.trip.trip_keywords}</h4>
          <h4>Trip BodyTypes: {props.trip.body_types}</h4>
          <h4>Relationship: {props.trip.relationship}</h4>
          <h4>Trip Status: {props.trip.trip_status}</h4>
          <h4>Cost: {props.trip.cost}</h4>
        </div>
      </div>
    </div>
  );
}


export default TripDetails;
