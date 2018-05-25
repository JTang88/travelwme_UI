import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getConvoList from '../../../../graphql/queries/getConvoList';
import ConvoSelect from './ConvoSelect';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';

class MessageList extends Component {
  render() {
    console.log('here is props in message box', this.props);
    console.log('here is state in message box', this.state);
    return (
      <div>  
        {
          this.props.getConvoListQuery.loading ? '' :
          this.props.getConvoListQuery.getConvoList.convoIds.map(convoId => (
            <ConvoSelect
              convoId={convoId}
              renderConvo={this.props.renderConvo}
            />
          ))
        }
      </div>
    );
  }
}

const WrappedMessageList = compose(
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
)(MessageList);

export default WrappedMessageList;


// fetch all convoId using convoIdList
  // map each convId to Convo Component
    // inside of Convo Component, fetch each convo by it's convoId