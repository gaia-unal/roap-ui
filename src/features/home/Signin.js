import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { Redirect } from 'react-router';

import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from './redux/actions';

export class Signin extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    role: 'creator',
    emailErrorText: '',
    showDialog: false,
    dialogText: '',
    redirectToLogin: false,
  };

  setEmail(event) {
    this.setState({ email: event.target.value });
    let emailErrorText = null;
    if (event.target.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || event.target.value === '') {
      emailErrorText = '';
    } else {
      emailErrorText = 'Invalid field';
    }
    this.setState({
      emailErrorText,
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  setName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit() {
    const signinPromise = this.props.actions.signinUser({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      requestedRole: this.state.role,
    });
    signinPromise.then((res) => {
      this.sendUserEmail(this.state.email);
    });
    signinPromise.catch((err) => {
      const errorTitle = err.response.body.description[0];
      // implements "getActionByError" function.
      const errorText = (
        <div>
          <RaisedButton
            fullWidth
            label="Click to login"
            onClick={() => this.setState({
              redirectToLogin: true
            })}
          />
        </div>
      );
      this.setState({
        dialogText: errorText,
        dialogTitle: errorTitle,
        showDialog: true
      });
    });
  }

  sendUserEmail(userEmail) {
    this.setState({
      showDialog: true,
      dialogTitle: 'Email validation.',
      dialogText: 'Sending validation email...'
    });
    const sendEmailPromise = this.props.actions.userSendEmail({
      email: userEmail
    });
    sendEmailPromise.then(() => {
      this.setState({
        dialogText: `
          Validation email has been sended, 
          please check your email.
        `
      });
    });
    sendEmailPromise.catch(() => {
      // nothing.
    });
  }

  /* remove administrator from role options. */

  render() {
    return (
      <div
        className="home-login"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.showDialog}
          onRequestClose={() => this.setState({ showDialog: false })}
        >
          {this.state.dialogText}
        </Dialog>
        {this.state.redirectToLogin && <Redirect push to="/login" />}
        <Paper
          className="home-login"
          style={{
            width: '300px',
            height: '320px',
          }}
        >
          <center>
            <TextField
              floatingLabelText="Name"
              value={this.state.name}
              onChange={(e) => { this.setName(e); }}
            />
            <br />
            <TextField
              floatingLabelText="E-mail"
              value={this.state.email}
              errorText={this.state.emailErrorText}
              onChange={(e) => { this.setEmail(e); }}
            />
            <br />
            <TextField
              type="password"
              value={this.state.password}
              floatingLabelText="Password"
              onChange={(e) => { this.setPassword(e); }}
            />
            <DropDownMenu
              value={this.state.role}
              onChange={(event, index, value) => { this.setState({ role: value }); }}
              style={{ width: '100%' }}
            >
              <MenuItem value="creator" primaryText="Creator" />
              <MenuItem value="expert" primaryText="Expert" />
              <MenuItem value="administrator" primaryText="Administrator" />
            </DropDownMenu>
            <br />
            <RaisedButton
              label="Submit"
              primary
              disabled={
                this.state.email === '' ||
                this.state.password === '' ||
                this.state.name === '' ||
                this.state.role === '' ||
                this.state.emailErrorText === 'Invalid field'
              }
              onClick={() => { this.handleSubmit(); }}
            />
          </center>
        </Paper>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
