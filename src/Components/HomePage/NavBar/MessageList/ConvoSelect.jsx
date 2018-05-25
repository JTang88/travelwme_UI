import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getConvo from '../../../../graphql/queries/getConvo';
import msgAdded from '../../../../graphql/subscriptions/msgAdded';

class ConvoSelect extends Component {
  componentWillMount() {
    const { convoId } = this.props;
    this.props.data.subscribeToMore({
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

  componentDidUpdate(prevProps) {
    if (prevProps.data.getConvo.msgs !== this.props.data.getConvo.msgs) {
      this.props.renderConvo(this.props.data.getConvo.msgs);
    }
  }

  render() {
    console.log('this is props in ConvoSelect', this.props);
    return this.props.data.loading ? '' : (
      <div onClick={e => this.props.renderConvo(this.props.data.getConvo.msgs, e)}>
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