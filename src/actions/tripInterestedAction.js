function tripInterested(travelers) {
  let iTravelers = [];
  for (let i = 0; i < travelers.length; i++) {
    if (travelers[i].user_type === 'I') {
      iTravelers.push(travelers[i]);
    }
  }
  return {
    type: 'INTERESTED',
    payload: iTravelers,
  };
}

export default tripInterested;

