import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getConvoList from '../../../../graphql/queries/getConvoList';
import Convo from './Convo';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';

class MessageBox extends Component {
  render() {
    console.log('here is props in message box', this.props);
    // const { convoIds } = this.props.getConvoListQuery.getConvoList  
    return (
      this.props.getConvoListQuery.loading ? '' :
      <div>
        <h2>Message Box in the House</h2>
        {
          this.props.getConvoListQuery.getConvoList.convoIds.map(convoId => (
            <Convo 
              convoId={convoId.convoId}
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