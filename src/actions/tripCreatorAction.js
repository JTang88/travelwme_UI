function tripCreator(travelers) {
  let creator = {};
  for (let i = 0; i < travelers.length; i++) {
    if (travelers[i].user_type === 'C') {
      creator = travelers[i];
    }
  }
  return {
    type: 'CREATOR',
    payload: creator,
  };
}

export default tripCreator;

