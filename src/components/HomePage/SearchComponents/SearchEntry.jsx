import React from 'react';

const SearchEntry =({trip})=>(
  <div>

      <div>
        <img src='http://cdn1.smartvectorpics.com/images/imagesbase/fpik/air-travel-vector-background_23-2147493630.jpg'></img>
      </div>
      <div>
      <Link to="/sign" href="/sign">{trip.title}</Link>
        <h4>Cost: {trip.cost}</h4>
        <h4>Date: {trip.date_start} - {trip.date_start}</h4>
        <h4>{trip.description}</h4>
      </div>
  </div>
  );

export default SearchEntry;
