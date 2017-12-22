import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const SearchEntry =({ trip })=>
// {
//   console.log('I am here', trip)
//   return
  (<div className="card" >

      <div>
        <img className="card-img-top" src={trip.publicId ||'http://cdn1.smartvectorpics.com/images/imagesbase/fpik/air-travel-vector-background_23-2147493630.jpg'} />
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
