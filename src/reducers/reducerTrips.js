export default function (state = [], action) {
  switch (action.type) {
<<<<<<< HEAD
    case 'ALL_TRIPS':
=======
    case 'USER_TRIPS':
>>>>>>> refs/remotes/origin/master
      return action.payload;
  }
  return state;
}
