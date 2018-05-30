import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getConvoList from '../../../../graphql/queries/getConvoList';
import ConvoSelect from './ConvoSelect';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import convoAdded from '../../../../graphql/subscriptions/convoAdded';

class MessageList extends Component {
  componentWillMount() {
    const { convoListId } = this.props.getCurrentUserQuery.getCurrentUser;
    this.props.getConvoListQuery.subscribeToMore({
      document: convoAdded,
      variables: {
        convoListId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newConvoId = subscriptionData.data.convoAdded;
        if (!prev.getConvoList.convoIds.find(convoId => convoId === newConvoId)) {
          const current = Object.assign({}, prev, {
            getConvoList: Object.assign({}, prev.getConvoList, {
              convoIds: [...prev.getConvoList.convoIds, newConvoId],
            }),
          });
          return current;
        }
        return prev;
      },
    });
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.getConvoListQuery.loading) {
      const { convoIds } = this.props.getConvoListQuery.getConvoList;
      const { convoIds: nextConvoIds } = nextProps.getConvoListQuery.getConvoList;
      return JSON.stringify(convoIds) !== JSON.stringify(nextConvoIds);
    }
  }

  render() {
    console.log('render MessageList')
    return (
      <div>  
        {
          this.props.getConvoListQuery.loading ? '' :
          this.props.getConvoListQuery.getConvoList.convoIds.map(convoId => (
            <ConvoSelect
              key={convoId}
              convoId={convoId}
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