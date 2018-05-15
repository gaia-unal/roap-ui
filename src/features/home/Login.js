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
    redirectToHome: false,
    redirectToSignin: false,
    showDialog: false,
    dialogText: '',
    dialogTitle: '',
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

  getActionByError(dialogText) {
    switch(dialogText){
      case 'User email is not validated.':
        return (
          <RaisedButton
            fullWidth
            label="Send validation email again"
            onClick={() => {
              this.setState({
                dialogText: <p>Sending validation email...</p>
              });
              this.props.actions.userSendEmail({
                email: this.state.email
              }).then(() => {
                this.setState({
                  dialogText: <p>{
                    `Validation email has been sended, 
                    please check your email.`
                  }</p>
                });
              })
            }}
          />
        );
      case 'User not found.':
        this.setState({ email: '', password: '' });
        return (
          <RaisedButton
            fullWidth
            label="Signin"
            onClick={() => this.setState({
              redirectToSignin: true
            })}
          />
        );
      case 'User is not validated by admin.':
        this.setState({ email: '', password: '' });
        return (
          <p>Please wait to admin activate your account.</p>
        );
      case 'Invalid password.':
        this.setState({ email: '', password: '' });
        return (
          <p>Please tray again.</p>
        );
    }
  }

  handleSubmit() {
    const promise = this.props.actions.loginUser({
      email: this.state.email,
      password: this.state.password,
    });
    promise.then(() => {
      this.setState({ redirectToHome: (this.props.home.user !== null) });
    });
    promise.catch((error) => {
      const dialogTitle = error.response.body.description[0];
      this.setState({
        showDialog: true,
        dialogTitle: dialogTitle,
        dialogText: (
          <div>
            {this.getActionByError(dialogTitle)}
          </div>
        ),
      });
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
        {this.state.redirectToHome && <Redirect push to="/" />}
        {this.state.redirectToSignin && <Redirect push to="/signin" />}
        <Dialog
          title={this.state.dialogTitle}
          open={this.state.showDialog}
          onRequestClose={() => this.setState({ showDialog: false })}
        >
          {this.state.dialogText}
        </Dialog>
        <Paper
          className="home-login"
          style={{
            width: '300px',
            height: '200px',
          }}
        >
          <center>
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
              disabled={this.state.email === '' || this.state.password === '' || this.state.emailErrorText === 'Invalid field'}
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
