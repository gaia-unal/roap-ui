import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { translate } from 'react-admin';
import { push } from 'react-router-redux';
import userService from '../custom-services/user';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactJson from 'react-json-view';

const user = new userService();

class RecoverPasswordHandler extends Component {
  constructor(props){
    super(props);
    this.state = {
      showErrorMessage: ''
    };
    this.translate = props.translate;
  }

  submit = (credentials) => {
    user.recoverPasswordUserAccount(
      this.props.match.params.token,
      credentials.password,
      res => this.props.push('/learning-object-collection'),
      err => this.setState({showErrorMessage: JSON.parse(err.response.text)})
    );
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Dialog
          open={this.state.showErrorMessage !== ''}
          onClose={() => this.setState({showErrorMessage: ''})}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Error</DialogTitle>
          <DialogContentText><ReactJson src={this.state.showErrorMessage} /></DialogContentText>
        </Dialog>
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
            disabled={!this.state.password || (this.state.password !== this.state.confirm_password) }
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
