import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { Redirect } from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from './redux/actions';


export class Login extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
    emailErrorText: '',
    buttonDisabled: true,
    showHome: false,
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
      buttonDisabled: (event.target.value === '' || this.state.password === '' || emailErrorText === 'Invalid field')
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value,
      buttonDisabled: (this.state.email === '' || event.target.value === '' || this.state.emailErrorText === 'Invalid field')
    });
  }

  handleSubmit() {
    const promise = new Promise((resolve) => {
      resolve(
        this.props.actions.loginUser({
          email: this.state.email,
          password: this.state.password,
        })
      );
    });
    promise.then(() => {
      this.setState({ showHome: (this.props.home.userToken !== null) });
    });
  }

  render() {
    return (
      <center>
        <Paper
          className="home-login"
          style={{
            width: '300px',
            height: '200px',
          }}
        >
          {this.state.showHome && <Redirect push to="/home" />}
          <TextField
            floatingLabelText="E-mail"
            errorText={this.state.emailErrorText}
            onChange={(e) => { this.setEmail(e); }}
          />
          <br />
          <TextField
            type="password"
            floatingLabelText="Password"
            onChange={(e) => { this.setPassword(e); }}
          />
          <br />
          <RaisedButton
            label="Login"
            primary
            disabled={this.state.buttonDisabled}
            onClick={() => { this.handleSubmit(); }}
          />
        </Paper>
      </center>
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
)(Login);
