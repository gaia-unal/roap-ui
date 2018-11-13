import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { userLogin } from 'react-admin';

import { push } from 'react-router-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { showNotification } from 'react-admin';

class LoginPage extends Component {
  state = { password: null, email: null};

  submit = (credentials) => {
    this.props.userLogin({
      ...credentials
    });
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
            onClick={() => {this.submit(this.state); this.props.showNotification('holi')}}
          >
            Login
          </Button>
        </Paper>
        <br />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.props.push("/")}
        >
          Go to learning objects
        </Button>
      </div>
    );
  }
};

export default connect(null, { userLogin, push, showNotification })(LoginPage);
