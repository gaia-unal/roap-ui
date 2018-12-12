import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { userLogin } from 'react-admin';
import { push } from 'react-router-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { showNotification } from 'react-admin';

import { translate } from 'react-admin';
import GetRecoverPassword from '../getRecoverPassword';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      email: null,
      openRecoverPasswordModal: false
    };
  }

  handleClickOpen() {
    this.setState({openRecoverPasswordModal: true});
  }

  handleClickClose() {
    this.setState({openRecoverPasswordModal: false});
  }


  submit = (credentials) => {
    this.props.userLogin({
      ...credentials
    });
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
        <GetRecoverPassword
          open={ this.state.openRecoverPasswordModal }
          close={ () => this.handleClickClose.bind(this) }></GetRecoverPassword>
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
          <TextField
            label={ translate('ra.auth.password') }
            type="password"
            autoComplete="current-password"
            onChange={e =>
              this.setState({ password: e.target.value})
            }
            required
          />
          <Button
            onClick={() => this.handleClickOpen()}
            variant="outlined"
            color="primary" 
            style={{ marginTop:10 }}>
            ¿Olvido su contraseña?
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop:10 }}
            disabled={!email || !password}
            onClick={() => this.submit(this.state)}
          >
            { translate('ra.auth.sign_in') }
          </Button>
        </Paper>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop:10 }}
          onClick={() => this.props.push("/")}
        >
          { translate('lo.go_to') }
        </Button>
      </div>
    );
  }
};

export default connect(null, { userLogin, push, showNotification })(translate(LoginPage));
