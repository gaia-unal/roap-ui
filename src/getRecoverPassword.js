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
            onChange={e => {
              e.persist();
              this.props.handleChange(e);
              this.props.setFieldTouched('email', true, false);
            }}
            type="email"
            helperText={this.props.touched.email ? translate(this.props.errors.email) : ''}
            error={this.props.touched.email && Boolean(this.props.errors.email)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close()} color="primary">
            {translate('ra.action.cancel')}
          </Button>
          <Button onClick={() => this.handleRequestToken()} color="primary" disabled={!this.props.isValid}>
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
)(
  translate(
    withFormik({
      mapPropsToValues: () => ({ email: '' }),
      validationSchema: object({
        email: string('')
          .email('errorMessages.email')
          .required('errorMessages.required'),
      }),
    })(GetRecoverPassword)
  )
);
