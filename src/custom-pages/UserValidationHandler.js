import React, { Component } from 'react';
import { connect } from 'react-redux';

import userService from '../custom-services/user';

import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReactJson from 'react-json-view';

import { push } from 'connected-react-router';

const user = new userService();

class UserValidationHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentWillMount() {
    user.validateAccount(
      this.props.match.params.token,
      res => this.props.push('/login'),
      err => this.setState({ error: JSON.parse(err.response.text) })
    );
  }

  render() {
    // TODO: fix error handle
    return (
      <div>
        <Dialog open={this.state.error} onClose={() => this.setState({ redirectToRoot: true, error: null })}>
          <DialogTitle>Error</DialogTitle>
          <DialogContentText>
            <ReactJson src={this.state.error} />
          </DialogContentText>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  undefined,
  { push }
)(UserValidationHandler);
