import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getConvoList from '../../../../graphql/queries/getConvoList';
import ConvoSelect from './ConvoSelect';
import Message from './Message';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';

class MessageBox extends Component {
  state = {
    msgs: undefined,
  };

  renderConvo(msgs, e) {
    e.preventDefault();
    this.setState({
      msgs,
    })
  }
  render() {
    console.log('here is props in message box', this.props);
    console.log('here is state in message box', this.state);
    return (
      <div>  
        <h2>Message Box in the House</h2>
        {
          this.props.getConvoListQuery.loading ? '' :
          this.props.getConvoListQuery.getConvoList.convoIds.map(convoId => (
            <ConvoSelect
              convoId={convoId}
              renderConvo={this.renderConvo.bind(this)}
            />
          ))
        }
        {
          this.props.getConvoListQuery.loading || !this.state.msgs ? '' : 
          this.state.msgs.map(msg => (
            <Message 
              key={msg._id}
              username={msg.username}
              text={msg.text}
            />
          ))
        }
      </div>
    );
  }
}

const WrappedMessageBox = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getConvoList, {
    name: 'getConvoListQuery',
    options: props => ({
      variables: {
        convoListId: props.getCurrentUserQuery.getCurrentUser.convoListId,
      },
    }),
  }), 
)(MessageBox);

export default WrappedMessageBox;


// fetch all convoId using convoIdList
  // map each convId to Convo Component
    // inside of Convo Component, fetch each convo by it's convoId