import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Menu, MenuItem, withStyles } from '@material-ui/core';
import getConvoList from '../../../../graphql/queries/getConvoList';
import ConvoSelect from './ConvoSelect';
import BarButton from '../../../Global/BarButton';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import convoAdded from '../../../../graphql/subscriptions/convoAdded';
import toggleNewMessage from '../../../../graphql/mutations/toggleNewMessage';
import './index.css';

class MessageList extends Component {
  state = {
    anchorEl: null
  };

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

  // shouldComponentUpdate(nextProps) {
  //   if (!this.props.getConvoListQuery.loading) {
  //     const { convoIds } = this.props.getConvoListQuery.getConvoList;
  //     const { convoIds: nextConvoIds } = nextProps.getConvoListQuery.getConvoList;
  //     return JSON.stringify(convoIds) !== JSON.stringify(nextConvoIds);
  //   }
  //   return true;
  // }

  handleMessageListClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.props.toggleNewMessageMutation({
      variables: {
        userId: this.props.getCurrentUserQuery.getCurrentUser.id
      }
    })
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div style={{ display: 'inline-block' }}>  
        <BarButton onClick={this.handleMessageListClick}>Message</BarButton>
        <Menu
          id="message-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >   
          {
            this.props.getConvoListQuery.loading ? '' :
              this.props.getConvoListQuery.getConvoList.convoIds.map(convoId => (
              <MenuItem key={convoId}>
                <ConvoSelect
                  convoId={convoId}
                  currentUser={this.props.getCurrentUserQuery.getCurrentUser}
                />
              </MenuItem>
              ))
          }
        </Menu>
      </div>
    );
  }
}


const WrappedMessageList = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(toggleNewMessage, {
    name: 'toggleNewMessageMutation',
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
