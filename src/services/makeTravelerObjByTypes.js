const makeTravelerObjByTypes = (members, id) => {
  const interesters = [];
  const joiners = [];
  let creator = '';
  let currentUser = 'N';
  for (let i = 0; i < members.length; i++) {
    if (members[i].user_type === 'C') {
      creator = members[i];
      if (creator.user.id === id) {
        currentUser = 'C';
      }
    } else if (members[i].user_type === 'I') {
      interesters.push(members[i]);
      if (members[i].user.id === id) {
        currentUser = 'I';
      }
    } else if (members[i].user_type === 'J') {
      joiners.push(members[i]);
      if (members[i].user.id === id) {
        currentUser = 'J';
      }
    }  
  }
  return {
    creator,
    interesters,
    joiners,
    currentUser,
  }; 
};

export default makeTravelerObjByTypes;