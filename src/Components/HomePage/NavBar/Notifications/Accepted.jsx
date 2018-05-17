import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import getTrip from '../../../../graphql/queries/getTrip';

class Accepted extends Component {
  state = { refetched: false }

  handleRefetch() {
    this.props.data.refetch();
    this.setState({ refetched: true });
  }

  render() {
    console.log('here is props in Accepted', this.props);
    // const { tripId, userId, tripTitle } = this.props;
    return (
      <div>
        {
          this.state.refetched ?
            <Link to={`/homepage/joined/tripinfo/92`}>
              Congrats!, you have been accepted to test Trip
            </Link> :
            <div>
              <Link
                to={`/homepage/joined/tripinfo/92`}
                onClick={this.handleRefetch.bind(this)}
              >
                Congrats!, you have been accepted to test trip
              </Link>
            </div>
        }
      </div>
    );
  }
}

const WrappedAccepted = graphql(getTrip, {
  options: props => ({ variables: { id: 92 } }),
})(Accepted);

export default WrappedAccepted;






// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
// import getTrip from '../../../../graphql/queries/getTrip';

// class Accepted extends Component {
//   state = { refetched: false }

//   handleRefetch() {
//     this.props.data.refetch();
//     this.setState({ refetched: false });
//   }

//   render() {
//     console.log('here is props in Accepted', this.props);
//     const { tripId, userId, tripTitle } = this.props;
//     return (
//        <div>
//          {
//            this.state.refetched ? 
//             <Link to={`/homepage/joined/tripinfo/${tripId}`}>
//               Congrats!, you have been accepted to {tripTitle} 
//             </Link> :
//             <div>
//               <button onClick={this.handleRefetch.bind(this)}>
//                 Accepted right here
//               </button>
//               <Link 
//                 to={`/homepage/joined/tripinfo/${tripId}`}
//                 onClick={this.handleRefetch.bind(this)}
//               >
//                 Congrats!, you have been accepted to {tripTitle} 
//               </Link> 
//             </div>
//          }
//        </div>  
//     );
//   }
// }

// const WrappedAccepted = graphql(getTrip, {
//   options: props => ({ variables: { id: 92 } }),
// })(Accepted);

// export default WrappedAccepted;
