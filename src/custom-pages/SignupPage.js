import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import userService from '../custom-services/user';

import { push } from 'react-router-redux';

import { translate } from 'react-admin';
import Notification, { openNotification } from '../notification';
import { withFormik } from 'formik';
import { object, string, ref } from 'yup';

const user = new userService();
const resendEmailValidation = (message, sendEmail, email) => (
  <Button key="resend" variant="outlined" size="small" onClick={() => sendEmail(email)}>
    {message}
  </Button>
);

const userExists = (message, push) => (
  <Button key="goToLogin" variant="outlined" size="small" onClick={() => push('/login')}>
    {message}
  </Button>
);

class SignupPage extends Component {
  submit = credentials => {
    const { translate } = this.props;
    const resend = translate('action.resend');
    const messageWelcome = translate('signUp.welcome');
    const messageUserExists = translate('signUp.userExists');
    const login = translate('ra.auth.sign_in');

    user.post(
      credentials.email,
      credentials.password,
      credentials.name,
      credentials.requestedRole,
      res =>
        user.sendUserEmail(
          credentials.email,
          res => {
            this.props.push('/learning-object-collection');
            openNotification({
              message: messageWelcome,
              variant: 'success',
              duration: null,
              action: resendEmailValidation(
                resend,
                email => {
                  user.sendUserEmail(email, () => {}, () => {});
                },
                credentials.email
              ),
            });
          },
          err => console.log(err)
        ),
      err => {
        if (err.status === 409) {
          openNotification({
            message: messageUserExists,
            variant: 'error',
            duration: null,
            action: userExists(login, this.props.push),
          });
        } else {
          this.setState({ showErrorMessage: JSON.parse(err.response.text) });
        }
      }
    );
  };

  change = (name, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(name, true, false);
  };

  render() {
    const { values, errors, touched, isValid, translate } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Notification />
        <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="current-email"
            value={values.email}
            onChange={this.change.bind(null, 'email')}
            helperText={touched.email ? translate(errors.email) : ''}
            error={touched.email && Boolean(errors.email)}
            autoFocus
            required
          />
          <TextField
            label={translate('user.name')}
            name="name"
            type="text"
            value={values.name}
            autoComplete="current-text"
            onChange={this.change.bind(null, 'name')}
            helperText={touched.name ? translate(errors.name) : ''}
            error={touched.name && Boolean(errors.name)}
            required
          />
          <TextField
            label={translate('ra.auth.password')}
            name="password"
            type="password"
            value={values.password}
            autoComplete="current-password"
            onChange={this.change.bind(null, 'password')}
            helperText={touched.password ? translate(errors.password) : ''}
            error={touched.password && Boolean(errors.password)}
            required
          />
          <TextField
            label={translate('ra.auth.password')}
            name="passwordConfirm"
            type="password"
            value={values.passwordConfirm}
            autoComplete="current-password"
            onChange={this.change.bind(null, 'passwordConfirm')}
            helperText={touched.passwordConfirm ? translate(errors.passwordConfirm) : ''}
            error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
            required
          />
          <Button
            variant="outlined"
            style={{ marginTop: '10px' }}
            color="primary"
            disabled={!isValid}
            onClick={() => this.submit({ ...values, role: 'creator' })}
          >
            {translate('auth.sign_up')}
          </Button>
        </Paper>
      </div>
    );
  }
}

export default connect(
  null,
  { push }
)(
  translate(
    withFormik({
      mapPropsToValues: () => ({
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
      }),
      validationSchema: object({
        email: string('')
          .email('errorMessages.email')
          .required('errorMessages.required'),
        name: string('').required('errorMessages.required'),
        password: string('')
          .min(8, 'errorMessages.passwordLen')
          .required('errorMessages.required'),
        passwordConfirm: string('')
          .oneOf([ref('password'), null], 'errorMessages.passwordConfirm')
          .required('errorMessages.required'),
      }),
    })(SignupPage)
  )
);
