import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import userService from './custom-services/user';
import { withFormik } from 'formik';
import { string, object } from 'yup';

const user = new userService();

class GetRecoverPassword extends Component {
  handleRequestToken() {
    user.sendEmailRecoverPassword(
      this.props.values.email,
      res => this.props.push('/learning-object-collection'),
      err => console.error(err)
    );
  }

  handleClickClose() {
    this.props.close();
  }

  render() {
    const { translate } = this.props;

    return (
      <Dialog open={this.props.open} aria-labelledby="get-recover-password-title">
        <DialogTitle id="get-recover-password-title">{translate('recover_password.title_modal')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{translate('recover_password.message_modal')}</DialogContentText>
          <TextField
            autoFocus
            id="emailRecoverPassword"
            name="email"
            label="Email"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.close()} color="primary">
            {translate('ra.action.cancel')}
          </Button>
          <Button onClick={() => this.handleRequestToken()} color="primary">
            {translate('action.send')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  { push }
)((GetRecoverPassword)
);
