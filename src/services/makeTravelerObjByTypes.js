const makeTravelerObjByTypes = (members, id, creatorId) => {
  const interesters = [];
  const joiners = [];
  let currentUserType = 'N';
  let currentMember = {};
 
  const membersCopy = members.slice();
  
  membersCopy.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  if (id === creatorId) {
    currentUserType = 'C';
  }

  for (let i = 0; i < membersCopy.length; i++) {
    if (membersCopy[i].user_type === 'I') {
      interesters.push(membersCopy[i]);
      if (currentUserType === 'N' && membersCopy[i].user.id === id) {
        currentMember = membersCopy[i];
        currentUserType = 'I';
      }
    } else if (membersCopy[i].user_type === 'J') {
      joiners.push(membersCopy[i]);
      if (currentUserType === 'N' && membersCopy[i].user.id === id) {
        currentMember = membersCopy[i];
        currentUserType = 'J';
      }
    }  
  }
  return {
    interesters,
    joiners,
    currentUserType,
    currentMember,
  }; 
};

export default makeTravelerObjByTypes;