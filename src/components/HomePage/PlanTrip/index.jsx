import React from 'react';
import { Link } from 'react-router-dom';

function PlanTrip() {
  return (
    <div>
      <h1>Plan Trip</h1>
      <Link to="/homepage/mytrip/tripinfo" href="/homepage/mytrip/tripinfo">
        <button>Create Trip</button>
      </Link>
    </div>
  );
}

export default PlanTrip;
