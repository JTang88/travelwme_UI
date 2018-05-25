import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getConvo from '../../../../graphql/queries/getConvo';

class ConvoSelect extends Component {
  render() {
    console.log('this is props in ConvoSelect', this.props);
    return this.props.data.loading ? '' : (
      <div onClick={(e) => this.props.renderConvo(this.props.data.getConvo.msgs, e)}>
        {this.props.data.getConvo.users.map(user => (<h5>{user.username}</h5>))}
      </div>
    );
  }
}

const WrappedConvoSelect = graphql(getConvo, {
  options: props => ({
    variables: {
      convoId: props.convoId,
    },
  }),
})(ConvoSelect);

export default WrappedConvoSelect;




// class ConvoSelect extends Component {
//   handleOnClick(e) {
//     this.props.renderConvo(this.props.data.getConvo.msgs, e)
//     this.props.openChatBox();
//   }

//   render() {
//     console.log('this is props in ConvoSelect', this.props);
//     return this.props.data.loading ? '' : (
//       <div onClick={this.handleOnClick.bind(this)} >
//         {this.props.data.getConvo.users.map(user => (<h5>{user.username}</h5>))}
//       </div>
//     );
//   }
// }


// const WrappedConvoSelect = graphql(getConvo, {
//   options: props => ({
//     variables: {
//       convoId: props.convoId,
//     },
//   }),
// })(ConvoSelect);

// export default WrappedConvoSelect;