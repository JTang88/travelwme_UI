const makeTravelerObjByTypes = (members, id, creatorId) => {
  const interesters = [];
  const joiners = [];
  let currentUser = 'N';
  let currentMemberId;
 
  const membersCopy = members.slice();
  
  membersCopy.sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  if (id === creatorId) {
    currentUser = 'C';
  }

  for (let i = 0; i < membersCopy.length; i++) {
    if (membersCopy[i].user_type === 'I') {
      interesters.push(membersCopy[i]);
      if (currentUser === 'N' && membersCopy[i].user.id === id) {
        currentUser = 'I';
        currentMemberId = membersCopy[i].id;
      }
    } else if (membersCopy[i].user_type === 'J') {
      joiners.push(membersCopy[i]);
      if (currentUser === 'N' && membersCopy[i].user.id === id) {
        currentUser = 'J';
        currentMemberId = membersCopy[i].id;
      }
    }  
  }
  return {
    interesters,
    joiners,
    currentUser,
    currentMemberId,
  }; 
};

export default makeTravelerObjByTypes;