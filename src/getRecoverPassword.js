import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import userService from './custom-services/user';
import { Form, Field } from 'react-final-form';
import { email, TextInput, useNotify } from 'react-admin';

const user = new userService();

const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  ...props
}) => (
    <TextInput
      {...inputProps}
      {...props}
      fullWidth
    />
  )


const GetRecoverPassword = ({ translate, values, push, close, open, validate }) => {
  const notify = useNotify();
  const handleSubmit = (values) => {
    if ('email' in values) {
      user.sendEmailRecoverPassword(
        values.email,
        res => push('/learning-object-collection'),
        err => console.error(err)
      );
    } else {
      notify('errorMessages.email')
    }
  }

  return (
    <Dialog open={open} aria-labelledby="get-recover-password-title">
      <DialogTitle id="get-recover-password-title">{translate('recover_password.title_modal')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{translate('recover_password.message_modal')}</DialogContentText>
        <Form
          onSubmit={handleSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} id="getRecoverPasswordForm" noValidate>
              <Field
                autoFocus
                name="email"
                component={renderInput}
                label='Email'
                validate={email()}
              />
            </form>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()} color="primary" >
          {translate('ra.action.cancel')}
        </Button>
        <Button onClick={() => document.getElementById('getRecoverPasswordForm').dispatchEvent(new Event('submit', { cancelable: true }))} color="primary">
          {translate('action.send')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  null,
  { push }
)((GetRecoverPassword)
);
