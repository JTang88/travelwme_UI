const makeTravelerObjByTypes = (members, id, creatorId) => {
  const interesters = [];
  const joiners = [];
  let currentUser = 'N';
 
  if (id === creatorId) {
    currentUser = 'C';
  }

  for (let i = 0; i < members.length; i++) {
    if (members[i].user_type === 'I') {
      interesters.push(members[i]);
      if (currentUser === 'N' && members[i].user.id === id) {
        currentUser = 'I';
      }
    } else if (members[i].user_type === 'J') {
      joiners.push(members[i]);
      if (currentUser === 'N' && members[i].user.id === id) {
        currentUser = 'J';
      }
    }  
  }
  return {
    interesters,
    joiners,
    currentUser,
  }; 
};

export default makeTravelerObjByTypes;