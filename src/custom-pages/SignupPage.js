import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import userService from '../custom-services/user';

import { push } from 'react-router-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactJson from 'react-json-view';

import { translate } from 'react-admin';
import Notification, { openNotification } from '../notification';


const user = new userService();
const resendEmailvalidation =  (message, sendEmail, email) => (
  <Button
    key="resend"
    variant="outlined"
    size="small"
    onClick={ () =>  sendEmail(email)}>
    { message }
  </Button>
);

class SignupPage extends Component {
  state = {
    password: null,
    email: null,
    name: null,
    requestedRole: 'creator',
    showErrorMessage: ''
  };

  submit = (credentials) => {
    const { translate } = this.props;
    const resend = translate('action.resend');

    user.post(
      credentials.email,
      credentials.password,
      credentials.name,
      credentials.requestedRole,
      res => user.sendUserEmail(
        credentials.email,
        res => {
          this.props.push('/learning-object-collection')
          openNotification({
            message: translate('signUp.welcome'),
            variant: 'success',
            duration: null,
            action: resendEmailvalidation(resend, (email) => { user.sendUserEmail(email, () => {}, () => {}) }, credentials.email)
          });
        },
        err => console.log(err)
      ),
      err => this.setState({ showErrorMessage: JSON.parse(err.response.text) })
    );
  }

  render() {
    const { email, password } = this.state;
    const { translate } = this.props;

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <Notification/>
        <Dialog
          open={this.state.showErrorMessage !== ''}
          onClose={() => this.setState({showErrorMessage: ''})}
          aria-labelledby="responsive-dialog-title"
        >          <DialogTitle id="responsive-dialog-title">Error</DialogTitle>
          <DialogContentText><ReactJson src={this.state.showErrorMessage} /></DialogContentText>
          {/*"TODO: add forgot password in case of account is validated by admin, or add resend activation Email"*/}
        </Dialog>
        <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email"
            type="email"
            autoComplete="current-email"
            onChange={e =>
              this.setState({ email: e.target.value})
            }
            autoFocus
            required
          />
          <br />
          <TextField
            label={ translate('user.name') }
            type="text"
            autoComplete="current-text"
            onChange={e =>
              this.setState({ name: e.target.value})
            }
            required
          />
          <br />
          <TextField
            label={ translate('ra.auth.password') }
            type="password"
            autoComplete="current-password"
            onChange={e =>
              this.setState({ password: e.target.value})
            }
            required
          />
          <br />
          <TextField
            label={ translate('ra.auth.password') }
            type="password"
            autoComplete="current-password"
            onChange={e =>
              this.setState({ password: e.target.value})
            }
            required
          />
          <br />
          <br />
          <Button
            variant="outlined"
            style={{marginTop: '10px'}}
            color="primary"
            disabled={!email || !password}
            onClick={() => this.submit(this.state)}
          >
            { translate('auth.sign_up') }
          </Button>
        </Paper>
      </div>
    );
  }
};


export default connect(undefined, { push })(translate(SignupPage));
