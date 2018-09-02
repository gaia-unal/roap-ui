import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import userService from './custom-services/user';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactJson from 'react-json-view'

const user = new userService();

class SignupPage extends Component {
  state = {
    password: null,
    email: null,
    name: null,
    requestedRole: 'creator',
    showErrorMessage: ''
  };

  submit = (credentials) => {
    user.post(
      credentials.email,
      credentials.password,
      credentials.name,
      credentials.requestedRole,
      (res) => console.log(res), // TODO: make here a request to user-email
      (err) => this.setState({showErrorMessage: JSON.parse(err.response.text)})
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <Dialog
          open={this.state.showErrorMessage !== ''}
          onClose={() => this.setState({showErrorMessage: ''})}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Error</DialogTitle>
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
            label="Name"
            type="text"
            autoComplete="current-text"
            onChange={e =>
              this.setState({ name: e.target.value})
            }
            required
          />
          <br />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={e =>
              this.setState({ password: e.target.value})
            }
            required
          />
          <br />
          <TextField
            label="Password"
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
            color="primary"
            disabled={!email || !password}
            onClick={() => this.submit(this.state)}
          >
            Login
          </Button>
        </Paper>
      </div>
    );
  }
};

export default connect(undefined, { })(SignupPage);
