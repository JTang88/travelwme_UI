import React, { Component } from 'react'; 
import { graphql } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { withRouter } from 'react-router-dom';
import { Typography, Table, TableBody, TableCell, TableRow, Paper, withStyles, Button } from '@material-ui/core';
import { updateSearchState } from '../../../graphql/mutations/updateSearchState';
import './tripList.css'

const styles = theme => ({
  container: {
    minHeight: '80vh',
    marginBottom: 50,
    width: '100%',
  },
  root: {
    width: '60%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    transform: 'translate(33.26%)',
  },
  table: {
    minWidth: '100%',
  },
  picCell: {
    padding: '0 5px 0 0'
  },
  descriptionCell: {
    width: '40%',
  },
  numberCell: {
    textAlign: 'center',
    color: '#636e72',
    paddingRight: 0,
  },
  lastCell: {
    textAlign: 'center',
    color: '#636e72',
    paddingRight: 0,
    paddingTop: 19,
  }
});


class TripList extends Component {
  handleNewSearch = async (e) => {
    e.preventDefault();
    await this.props.mutate({
      variables: {
        searched: false,
      },
    });
    this.props.history.push('/homepage/search');
  }

  handleClick = (tripType, tripId) => {
    this.props.history.push(`/homepage/${tripType}/tripinfo/${tripId}`)
  }

  render() {
    const tripType = this.props.from === '/homepage' ? 'trend' :
      this.props.from === '/homepage/created' ? 'created' :
        this.props.from === '/homepage/joined' ? 'joined' :
          this.props.from === '/homepage/going' ? 'going' :
            this.props.from === '/homepage/waiting' ? 'waiting' : 'found';
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
            { 
              this.props.trips.map((trip) => {
                return (trip.id > 0 && trip.trip_status === 'open') || (trip.id > 0 && trip.trip_status === 'close' && tripType !== 'created') ? (
                  <TableRow 
                    hover 
                    onClick={() => this.handleClick(tripType, trip.id)} 
                    key={`tripList${trip.id}`}>
                    <TableCell className={classes.picCell} scope="row">
                      <Image cloudName="travelwme" publicId={trip.creator.publicId} />
                    </TableCell>
                    <TableCell className={classes.descriptionCell}>
                      <ul>
                        <li>
                          <Typography 
                            color="inherit" 
                            variant="body2" 
                            gutterBottom
                          > {trip.title}
                          </Typography>
                        </li>
                        <li>
                          <Typography 
                            color="inherit" 
                            variant="body1"
                          >{`Join ${trip.creator.username} for a trip to ${JSON.parse(trip.countries).join(' ')}`}
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            color="inherit"
                            variant="body1"
                          >{`From ${trip.date_start} to ${trip.date_end}`}
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            color="inherit"
                            variant="body1"
                          > Estimated cost at ${trip.cost}
                          </Typography>
                        </li>
                      </ul> 
                    </TableCell>
                    <TableCell className={classes.numberCell}>
                      <Typography
                        color="inherit"
                        variant="title"
                      > {trip.interesters}
                      </Typography>
                      <p>Interested</p>
                    </TableCell>
                    <TableCell className={classes.numberCell}>
                      <Typography
                        color="secondary"
                        variant="title"
                      > {trip.joiners}
                      </Typography>
                      <p>Joined</p>
                    </TableCell>
                    <TableCell className={classes.lastCell}>
                      <Typography
                        color="primary"
                        variant="title"
                      > {trip.forSureGoing}
                      </Typography>
                      <p>For Sure<br/>Going</p>
                    </TableCell>
                  </TableRow>
                ) : '';
              })
            }
            </TableBody>
          </Table>
        </Paper>
        {
          this.props.from === '/homepage/foundtrips' ?
             
            <div className="new-search-bottom-container">
              <Button variant="contained" color="secondary" size="large" onClick={this.handleNewSearch}>
                New Search
              </Button>
            </div>
            : ''
        }
      </div>
    );
  }
}


export default graphql(updateSearchState)(withStyles(styles)(withRouter(TripList)));









// class TripList extends Component {
//   handleNewSearch = async (e) => {
//     e.preventDefault();
//     await this.props.mutate({
//       variables: {
//         searched: false,
//       },
//     });
//     this.props.history.push('/homepage/searchtrips');
//   }

//   render() {
//     const tripType = this.props.from === '/homepage' ? 'trend' : 
//       this.props.from === '/homepage/created' ? 'created' :
//       this.props.from === '/homepage/joined' ? 'joined' : 
//       this.props.from === '/homepage/going' ? 'going' :
//       this.props.from === '/homepage/waiting' ? 'waiting' : 'found';
//     return (
//       <div>
//         { 
//           this.props.trips.map((trip) => { 
//             return (trip.id > 0 && trip.trip_status === 'open') || (trip.id > 0 && trip.trip_status === 'close' && tripType !== 'created') ? (
//               <div key={`tripList${trip.id}`} >
//                 <Image cloudName="travelwme" publicId={trip.creator.publicId} /> 
//                 <Link to={`/homepage/${tripType}/tripinfo/${trip.id}`}>
//                   <h3>{trip.title}</h3>
//                   <ul>
//                     <li>{`Come join ${trip.creator.username} for a trip to ${JSON.parse(trip.countries).join(' ')}`} </li>
//                     <li>From: {trip.date_start}</li>
//                     <li>To: {trip.date_end}</li>
//                     <li>Cost {trip.cost}</li>
//                     <li>{trip.interesters} travelers are interested</li>
//                     <li>{trip.joiners} travelers have joined the trip</li>
//                     <li>{trip.forSureGoing} travelers are for sure going </li>
//                   </ul>
//                 </Link>
//               </div>
//             ) : '';
//           }) 
//         }
//         {
//           this.props.from === '/homepage/foundtrips' ? 
//             <button onClick={this.handleNewSearch}>
//               New Search
//             </button> : ''
//         }
//       </div>
//     );
//   }
// } 


// export default graphql(updateSearchState)(TripList);