import React, { Component } from 'react';
import {
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
// import PrivateRoute from './PrivateRoute';
// import Homepage from '../HomePage';

const Landing = () => (
    <div>
      <div>Let's travel</div>
      {/* <AuthButton/> */}
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/sign">Signup</Link></li>
        </ul>
      <Route path="/login" component={Login} />
      <Route path="/sign" component={Signup} />

      {/* <PrivateRoute path="/homepage" component={Homepage}/> */}
    </div>
);

export default Landing;


// class Landing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       login: false,
//       first: true,
//     };
//   }

//   render() {
//     return (
//       <Router>
//         <div>
//           <div>Let's travel</div>
//           {/* <AuthButton/> */}
//             <ul>
//               <li><Link to="/login">login</Link></li>
//               <li><Link to="/sign">signup</Link></li>
//             </ul>

//           <Route path="/login" component={Login} />
//           {/* <PrivateRoute path="/homepage" component={Homepage}/> */}
//         </div>
//       </Router>
//     );
//   }
// }


// export default Landing;
