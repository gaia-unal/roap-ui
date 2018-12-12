import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-admin';
import { push } from 'react-router-redux';


class RecoverPasswordHandler extends Component {
  constructor(props){
    super(props);
    this.state = {error: null};
    this.translate = props.translate
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label={ this.translate('ra.auth.password') }
            type="password"
            autoComplete="current-password"
            onChange={e =>
              this.setState({ password: e.target.value})
            }
            required
          />
          <TextField
            label={ this.translate('auth.confirm_password') }
            type="password"
            autoComplete="current-password"
            onChange={e =>
              this.setState({ confirm_password: e.target.value})
            }
            required
          />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: 10 }}
            disabled={ this.state.password !== this.state.confirm_password }
            onClick={() => this.submit(this.state)}>
            { this.translate('auth.change_password') }
          </Button>
        </Paper>
        <br />
        <br />
      </div>
    );
  }
};

export default connect(undefined, { push })(translate(RecoverPasswordHandler));
