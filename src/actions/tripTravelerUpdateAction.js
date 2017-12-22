function updateTravelers(update) {
  console.log('update travelerrrrssss action', update);
  return {
    type: 'UPDATE_TRAVELERS',
    payload: update,
  };
}

export default updateTravelers;
