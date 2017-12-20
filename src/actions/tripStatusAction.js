function updateStatus(status) {
  return {
    type: 'TRIP_STATUS',
    payload: status,
  };
}

export default updateStatus;
