import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
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
    showUnknownUser: false,
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
    const promise = this.props.actions.loginUser({
      email: this.state.email,
      password: this.state.password,
    });
    promise.then(() => {
      this.setState({ showHome: (this.props.home.user !== null) });
    });
    promise.catch(() => {
      this.setState({ showUnknownUser: true, email: '', password: '', });
    });
  }

  render() {
    return (
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Dialog
          title="Unknown user"
          open={this.state.showUnknownUser}
          onRequestClose={() => this.setState({ showUnknownUser: false })}
        >
          Unknown user, please try again.
        </Dialog>
        <Paper
          className="home-login"
          style={{
            width: '300px',
            height: '200px',
          }}
        >
          <center>
            {this.state.showHome && <Redirect push to="/" />}
            <TextField
              floatingLabelText="E-mail"
              errorText={this.state.emailErrorText}
              value={this.state.email}
              onChange={(e) => { this.setEmail(e); }}
            />
            <br />
            <TextField
              type="password"
              floatingLabelText="Password"
              value={this.state.password}
              onChange={(e) => { this.setPassword(e); }}
            />
            <br />
            <RaisedButton
              label="Login"
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
)(Login);
