import decode from 'jwt-decode';
// import { withApollo } from 'react-apollo';

const checkAuth = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      // props.client.resetStore();
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

export default checkAuth;