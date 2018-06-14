import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { 
  Typography, 
  Grid,
  Menu, 
  MenuItem ,
} from '@material-ui/core/';
import BarButton from '../../Global/BarButton';
import Notifications from './Notifications';
import './navbar.css';
import UserBox from './UserBox';


class NavBar extends Component {
  state = {
    anchorEl: null
  };

  handleTripsClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClick = (value) => {
    this.props.history.push(value);
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelect = value => {
    this.props.history.push(`/homepage/${value}`)
    this.setState({ 
      anchorEl: null, 
    });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="header-container">
        <header>
          <div className="buttons-container">
            <BarButton onClick={() => this.handleClick('/homepage')}>Home</BarButton>
            <BarButton onClick={() => this.handleClick('/homepage/search')}>Search</BarButton>
            <BarButton onClick={() => this.handleClick('/homepage/plan')}>Plan</BarButton>
            <BarButton onClick={this.handleTripsClick}>Trips</BarButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => this.handleSelect('going')}>Going</MenuItem>
              <MenuItem onClick={() => this.handleSelect('created')}>Created</MenuItem>
              <MenuItem onClick={() => this.handleSelect('joined')}>Joined</MenuItem>
              <MenuItem onClick={() => this.handleSelect('waiting')}>Waiting</MenuItem>
            </Menu>
            {/* <BarButton>Notifications</BarButton> */}
            <Notifications />
            <BarButton>Messages</BarButton>
                {/* <UserBox /> */}    
          </div>
          <div className="clearfix" />
        </header>
      </div>
     
    );
  }
} 

export default withRouter(NavBar);
// const styles = theme => (console.log(theme), {
//   root: {
//     flexGrow: 1,
//     paddingTop: '60px',
//     backgroundColor: theme.palette.background.paper,
//   },
//   tabsRoot: {
//     borderBottom: `3px solid ${theme.palette.primary.light}`,
//   },
//   tabsflexContainer: {
//     float: 'right',
//     marginRight: '3%'
//   },
//   tabsIndicator: {
//     backgroundColor: '#b2bec3',
//   },
//   tabRoot: {
//     textTransform: 'initial',
//     color: '#2d3436',
//     minWidth: 72,
//     fontWeight: theme.typography.fontWeightRegular,
//     marginLeft: theme.spacing.unit * 2,
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       color: theme.palette.primary.main,
//       opacity: 5,
//     },
//     '&$tabSelected': {  
//       color: theme.palette.primary.main,
//       fontWeight: theme.typography.fontWeightMedium,
//     },
//   },
//   tabSelected: {},
// });

// class CustomizedTabs extends React.Component {
//   state = {
//     value: '/homepage',
//     anchorEl: null
//   };

//   handleClick = event => {
//     this.setState({ anchorEl: event.currentTarget });
//   };

//   handleClose = () => {
//     this.setState({ anchorEl: null });
//   };

//   handleSelect = value => {
//     this.props.history.push(`/homepage/${value}`)
//     this.setState({ 
//       anchorEl: null, 
//       value: `trips`,
//     });
//   };

//   handleChange = (value) => {
//     if (value === 'trips') {
//       return;
//     }
//     this.setState({ value }, console.log('this is state in tabs', this.state));
//     this.props.history.push(value);
//   };

//   render() {
//     const { classes } = this.props;
//     const { value, anchorEl } = this.state;

//     return (
//       <div className={classes.root}>
//         <Tabs
//           value={value}
//           onChange={this.handleChange}
//           classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator, flexContainer: classes.tabsflexContainer }}
//         >
//           <Tab
//             value={'/homepage'}
//             disableRipple
//             classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
//             label="Home"
//           />
//           <Tab
//             value={'/homepage/search'}
//             disableRipple
//             classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
//             label="Search"
//           />
//           <Tab
//             value={'/homepage/plantrip'}
//             disableRipple
//             classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
//             label="Plan"
//           />
//           <Tab
//             value={'trips'}
//             onClick={this.handleClick}
//             disableRipple
//             classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
//             label="Trips"
//           />
//           <Menu
//             id="simple-menu"
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={this.handleClose}
//           >
//             <MenuItem onClick={() => this.handleSelect('going')}>Going</MenuItem>
//             <MenuItem onClick={() => this.handleSelect('created')}>Created</MenuItem>
//             <MenuItem onClick={() => this.handleSelect('joined')}>Joined</MenuItem>
//             <MenuItem onClick={() => this.handleSelect('waiting')}>Waiting</MenuItem>
//          </Menu>
//         </Tabs>
//       </div>
//     );
//   }
// }


// CustomizedTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// const testCustomizedTabs = withRouter(CustomizedTabs)

// export default withStyles(styles)(testCustomizedTabs);


// import React from 'react';
// import { Link } from 'react-router-dom';
// import UserBox from './UserBox';
// import Notifications from './Notifications';
// import MessageList from './MessageList';

// const NavBar = ({ renderConvo }) => (
//   <div>
//     <h1 className="text-center">Travel With Me</h1>
//     <UserBox />
//     <nav className="navbar navbar-toggleable-md navbar-light bg-faded justify-content-center">
//       <div className="navbar-nav">
//         <Link to="/homepage" href="/homepage" className="nav-item nav-link">Home</Link>
//         <Link to="/homepage/plantrip" href="/homepage/plantrip" className="nav-item nav-link">Plan Trip</Link>
//         <Link to="/homepage/searchtrips" href="/homepage/searchtrips" className="nav-item nav-link">Search Trip</Link>
//         <li className="nav-item dropdown">
//           <a className="nav-link dropdown-toggle" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Trips
//           </a>
//           <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//             <Link to="/homepage/created" href="/homepage/created" className="dropdown-item">Created</Link>
//             <Link to="/homepage/joined" href="/homepage/joined" className="dropdown-item">Joined</Link>
//             <Link to="/homepage/waiting" href="/homepage/waiting" className="dropdown-item">Waiting</Link>
//             <Link to="/homepage/going" href="/homepage/going" className="dropdown-item">Going</Link>
//           </div>
//         </li>
//         <li className="nav-item dropdown">
//           <a className="nav-link" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//             Notifications
//           </a>
//           <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//             <Notifications />
//           </div>
//         </li>
//         <li className="nav-item dropdown">
//           <a className="nav-link" href="/homepage/mytrip" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//             Messages
//           </a>
//           <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
//             <MessageList 
//               renderConvo={renderConvo}
//             />
//           </div>
//         </li>
//       </div>
//     </nav>
//   </div>
// );
 
// export default NavBar;