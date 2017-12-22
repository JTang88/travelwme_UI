import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Image } from 'cloudinary-react';


const SearchEntry =({ trip })=>
// {
//   console.log('I am here', trip)
//   return
  (<div className="card" >

      <div>
      <Image cloudName="travelwme" publicId={trip.publicId} />
        </div>     

       <div className="card-title">     
      <Link to="/sign" href="/sign">{trip.title}</Link>
      </div>
      <div className="card-text">
        Cost: <h4>{trip.cost}</h4>
        Date range: <h4>{trip.date_start}</h4>-<h4> {trip.date_start}</h4>
        <h4>{trip.description}</h4>
      </div>  
       
      
      
  </div>
  )
// };

export default SearchEntry;
