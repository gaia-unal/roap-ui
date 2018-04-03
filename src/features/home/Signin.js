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
    buttonDisabled: true,
    showHome: false,
    showMessage: false,
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
      buttonDisabled: (
        event.target.value === '' ||
        this.state.password === '' ||
        this.state.name === '' ||
        this.state.role === '' ||
        emailErrorText === 'Invalid field'
      )
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value,
      buttonDisabled: (
        this.state.email === '' ||
        event.target.value === '' ||
        this.state.name === '' ||
        this.state.role === '' ||
        this.state.emailErrorText === 'Invalid field'
      )
    });
  }

  setName(event) {
    this.setState({
      name: event.target.value,
      buttonDisabled: (
        this.state.email === '' ||
        this.state.password === '' ||
        event.target.value === '' ||
        this.state.role === '' ||
        this.state.emailErrorText === 'Invalid field'
      )
    });
  }

  handleSubmit() {
    const promise = this.props.actions.signinUser({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      requestedRole: this.state.role,
    });
    promise.then(() => {
      this.setState({ showMessage: true });
    });
    promise.catch(() => {
      this.setState({ showMessage: true, name: '', email: '', password: '', role: 'creator', });
    });
  }

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
          title="Unknown user"
          open={this.state.showMessage}
          onRequestClose={() => { this.setState({ showMessage: false }); }}
        >
          {this.props.home.signinUserError === null ? 'Please, check your email and validate your account.' : (
            JSON.stringify(this.props.home.signinUserError)
          )}
        </Dialog>
        {this.state.showHome && <Redirect push to="/home" />}
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
              disabled={this.state.buttonDisabled}
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
