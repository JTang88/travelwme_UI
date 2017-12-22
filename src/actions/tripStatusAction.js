function updateStatus(statusup) {
  console.log('status action', statusup);
  return {
    type: 'TRIP_STATUS',
    payload: statusup,
  };
}

export default updateStatus;
