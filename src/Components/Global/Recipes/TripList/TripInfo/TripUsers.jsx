import React from 'react';
import UserCard from '../TripInfo/UserCard';
// import JoinTrip from './JoinTrip';

const findATypeOfTravelers = (members, type) => {
  const creator = [];
  for (let i = 0; i < members.length; i++) {
    if (members[i].user_type === type) {
      creator.push(members[i]);
    } 
  }
  return creator;
}; 

function TripUsers(props) {
  return (
    <div>
      <div className="tripsub">Creator</div>
      <div className="row">
        <UserCard user={findATypeOfTravelers(props.members, 'C')[0]} />
      </div>
      <div className="tripsub">Joined</div>
      <div className="row">
        {findATypeOfTravelers(props.members, 'J').map(joiner => (
          <div className="col-4">
            <UserCard key={joiner.user.id} user={joiner} /> 
          </div>))}
      </div>
      <div className="tripsub">Interested</div>
      <div className="row">
        {findATypeOfTravelers(props.members, 'I').map(interester => (
          <div className="col-4">
            <UserCard key={interester.user.id} user={interester} />
          </div>))}
      </div>
      {/* <div className="trippic">
        <JoinTrip />
      </div>  */}
    </div>
  );
}

export default TripUsers;
