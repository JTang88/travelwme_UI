export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  };
}

export function logout() {
  dispatch => {
    localStorage.removeItem('token');
    dispatch(setCurrentUser({}));
  }
  
}