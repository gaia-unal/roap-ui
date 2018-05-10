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
    showMessage: false,
    dialogMessage: '',
    redirectLogin: false,
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
      this.sendUserEmail(res.body._id, this.state.email);
    });
    signinPromise.catch((err) => {
      console.log(err);
      const getUserPromise = this.props.actions.getOneUser({
        id: err.response.body.description.user_id,
      });
      getUserPromise.then((res) => {
        const user = res.body;
        let msg = (
          <div>
            <p>User is already registered but no validated.</p>
            <RaisedButton
              label="Click to send again validation Email."
              primary
              onClick={() => {
                this.sendUserEmail(user._id, user.email);
              }}
            />
          </div>
        );
        if (user.validated) {
          msg = (
            <div>
              <p>User is already registered but.</p>
              <RaisedButton
                label="Click to login."
                primary
                onClick={() => this.setState({ redirectLogin: true })}
              />
            </div>
          );
        }
        this.setState({ dialogMessage: msg });
      });
      getUserPromise.catch(() => {
        // nothing.
      });
      this.setState({
        showMessage: true,
        dialogMessage: 'User is already register.',
        name: '',
        email: '',
        password: '',
        role: 'creator'
      });
    });
  }

  sendUserEmail(userId, userEmail) {
    this.setState({
      showMessage: true,
      dialogMessage: 'Sending validation email.'
    });
    const sendEmailPromise = this.props.actions.userSendEmail({
      email: userEmail,
      id: userId,
    });
    sendEmailPromise.then(() => {
      this.setState({
        dialogMessage: 'Email sended, check your email.'
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
          title="User Validation"
          open={this.state.showMessage}
          onRequestClose={() => this.setState({ showMessage: false })}
        >
          {this.state.dialogMessage}
        </Dialog>
        {this.state.redirectLogin && <Redirect push to="/login" />}
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
