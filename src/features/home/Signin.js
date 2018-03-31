import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { Redirect } from 'react-router';

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
    nameErrorText: '',
    emailErrorText: '',
    buttonDisabled: true,
    showLogin: false,
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
        this.state.emailErrorText === 'Invalid field'
      )
    });
  }

  handleSubmit() {
    const promise = new Promise((resolve) => {
      resolve(
        this.props.actions.signinUser({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
        })
      );
    });
    promise.then(() => {
      this.setState({ showLogin: (this.props.home.userToken !== null) });
    });
  }

  render() {
    return (
      <div className="home-login">
        {this.state.showLogin && <Redirect push to="/login" />}
        <center>
          <div>
            <TextField
              floatingLabelText="Name"
              errorText={this.state.nameErrorText}
              onChange={(e) => { this.setName(e); }}
            />
            <br />
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
              label="Submit"
              primary
              disabled={this.state.buttonDisabled}
              onClick={() => { this.handleSubmit(); }}
            />
          </div>
        </center>
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
