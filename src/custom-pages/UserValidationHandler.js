import React, { Component } from 'react';
import { connect } from 'react-redux';

import userService from '../custom-services/user';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReactJson from 'react-json-view'

const user = new userService();

class UserValidationHandler extends Component {
  constructor(props){
    super(props);
    this.state = {redirectToRoot: null, error: null};
  }

  componentWillMount(){
    user.validateAccount(
      this.props.match.params.token,
      res => this.setState({redirectToRoot: true}),
      err => this.setState({error: JSON.parse(err.response.text)}),
    )
  }

  render() {
    // TODO: fix error handle
    return (
      <div>
        {this.state.redirectToRoot ? <Redirect to="/" /> : !this.state.error && <CircularProgress />}
        <Dialog open={this.state.error} onClose={() => this.setState({redirectToRoot: true, error: null})}>
          <DialogTitle>Error</DialogTitle>
          <DialogContentText><ReactJson src={this.state.error}/></DialogContentText>
        </Dialog>
      </div>
    );
  }
};

export default connect(undefined, { })(UserValidationHandler);
