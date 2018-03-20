import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

export default class Logged extends Component {
  static propTypes = {

  };
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={{ marginRight: '20px' }}>
            <ActionAccountCircle />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem
          primaryText="Sign out"
          onClick={this.props.onSignOut}
        />
      </IconMenu>
    );
  }
}
