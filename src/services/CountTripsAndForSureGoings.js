const countTotalForSureGoings = (Trips) => {
  let tripsCount = 0;
  let forSureGoings = 0; 
  for (let i = 0; i < Trips.length; i++) {
    if (Trips[i].id > 0) {
      tripsCount++;
    }
    forSureGoings += Trips[i].forSureGoing;
  }
  return {
    forSureGoings,
    tripsCount,
  };
};

export default countTotalForSureGoings;