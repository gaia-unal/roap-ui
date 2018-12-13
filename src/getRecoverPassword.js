import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { push } from 'react-router-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import userService from './custom-services/user';
import { translate } from 'react-admin';
const user = new userService();

class GetRecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {email: null};
    this.translate = props.translate;
  }

  handleRequestToken() {
    user.sendEmailRecoverPassword(
      this.state.email,
      res => this.props.push('/learning-object-collection'),
      err => console.error(err)
    )
  }

  handleClickClose() {
    this.props.close()
  }

  render() {
    
    return(
      <Dialog
          open={ this.props.open }
          aria-labelledby="get-recover-password-title">
          <DialogTitle id="get-recover-password-title">{ this.translate('recover_password.title_modal') }</DialogTitle>
          <DialogContent>
            <DialogContentText>
              { this.translate('recover_password.message_modal') }
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={e =>
                this.setState({ email: e.target.value})
              }
              label="Email"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={ this.props.close() }
              color="primary">
              { this.translate('ra.action.cancel') }
            </Button>
            <Button
              onClick={() => this.handleRequestToken()}
              color="primary">
              { this.translate('action.send') }
            </Button>
          </DialogActions>
        </Dialog>
    )
  };
}

export default connect(null, { push })(translate(GetRecoverPassword));
