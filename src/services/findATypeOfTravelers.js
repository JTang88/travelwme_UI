const findATypeOfTravelers = (members, type) => {
  const creator = [];
  for (let i = 0; i < members.length; i++) {
    if (members[i].user_type === type) {
      creator.push(members[i]);
    } 
  }
  return creator;
}; 

export default findATypeOfTravelers;