function singleStatus(status) {
  return {
    type: 'SINGLE_STATUS',
    payload: status,
  };
}

export default singleStatus;