import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getConvo from '../../../../graphql/queries/getConvo';
import msgAdded from '../../../../graphql/subscriptions/msgAdded';
import { getChatBoxState } from '../../../../graphql/queries/getChatBoxState';
import { updateChatBoxState } from '../../../../graphql/mutations/updateChatBoxState';

class ConvoSelect extends Component {
  componentWillMount() {
    const { convoId } = this.props;
    this.props.getConvoQuery.subscribeToMore({
      document: msgAdded,
      variables: {
        convoId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMsg = subscriptionData.data.msgAdded;
        if (!prev.getConvo.msgs.find(msg => msg._id === newMsg._id)) {
          const current = Object.assign({}, prev, {
            getConvo: Object.assign({}, prev.getConvo, {
              msgs: [...prev.getConvo.msgs, newMsg],
            }),
          });
          return current;
        }
        return prev;
      },
    });
  }

  componentDidUpdate() {
    console.log('inside of componentDIdupdate before finish loading getConvo')
    if (!this.props.getConvoQuery.loading) {
      console.log('inside of componentDIdupdate after finish loading getConvo')
      const { users, _id } = this.props.getConvoQuery.getConvo;
      const { open, currentConvoId, receiverUserId } = this.props.getChatBoxStateQuery.getChatBoxState;
      if (open && currentConvoId === 'newConvo' && users.length === 2 && users[1].id === receiverUserId) {
        console.log('inside of componentDIdupdate and passed all filters')
        this.props.updateChatBoxStateMutation({
          variables: {
            open: true,
            currentConvoId: _id,
            currentReceiver: null,
            receiverUserId: null,
          },
        });
        console.log('inside of componentDIdupdate after updateChatBoxState has fired')
      }
    }
  }

  handleSelection(e) {
    e.preventDefault();
    this.props.updateChatBoxStateMutation({
      variables: {
        open: true,
        currentConvoId: this.props.getConvoQuery.getConvo._id,
        currentReceiver: null,
        receiverUserId: null,
      },
    });
  }

  render() {
    console.log('this is props in ConvoSelect', this.props);
    return this.props.getConvoQuery.loading ? '' : (
      <div onClick={this.handleSelection.bind(this)}>
        {this.props.getConvoQuery.getConvo.users.map(user => (<h5>{user.username}</h5>))}
      </div>
    );
  }
}

const WrappedConvoSelect = compose(
  graphql(getChatBoxState, {
    name: 'getChatBoxStateQuery'
  }),
  graphql(getConvo, {
    name: 'getConvoQuery',
    options: props => ({
      variables: {
        convoId: props.convoId,
      },
    }),
  }),
  graphql(updateChatBoxState, {
    name: 'updateChatBoxStateMutation',
  }),
)(ConvoSelect);

export default WrappedConvoSelect;