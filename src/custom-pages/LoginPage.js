import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { push } from 'react-router-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { showNotification } from 'react-admin';

import { translate } from 'react-admin';
import GetRecoverPassword from '../getRecoverPassword';
import GetValidateAccountToken from '../getValidateAccountToken';
import { withFormik } from 'formik';
import { string, object } from 'yup';
import Notification from '../notification';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openRecoverPasswordModal: false,
    };
  }

  handleClickOpen() {
    this.setState({ openRecoverPasswordModal: true });
  }

  handleClickClose() {
    this.setState({ openRecoverPasswordModal: false });
  }

  submit = credentials => {
    let s = this.props.userLogin({
      ...credentials,
    });
    console.log(s)
  };

  change = (name, e) => {
    e.persist();
    this.props.handleChange(e);
    this.props.setFieldTouched(name, true, false);
  };

  render() {
    const { values, errors, touched, isValid, translate, push } = this.props;

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
        <Notification/>
        <GetRecoverPassword
          open={this.state.openRecoverPasswordModal}
          translate={translate}
          close={() => this.handleClickClose.bind(this)}
        />
        <GetValidateAccountToken/>
        <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <TextField
            id="email"
            name="email"
            label="Email"
            value={values.email}
            helperText={touched.email ? translate(errors.email) : ''}
            error={touched.email && Boolean(errors.email)}
            onChange={this.change.bind(null, 'email')}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label={translate('ra.auth.password')}
            value={values.password}
            helperText={touched.password ? translate(errors.password) : ''}
            error={touched.password && Boolean(errors.password)}
            onChange={this.change.bind(null, 'password')}
            fullWidth
            type="password"
          />
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={() => this.submit(values)}
            disabled={!isValid}
          >
            {translate('ra.auth.sign_in')}
          </Button>
          <Button onClick={() => this.handleClickOpen()} variant="outlined" color="primary" style={{ marginTop: 10 }}>
            {translate('recover_password.forgot_your_password')}
          </Button>
        </Paper>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: 10 }}
          onClick={() => push('/configuration')}
        >
          {translate('lo.go_to')}
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { userLogin, push, showNotification }
)(
  translate(
    withFormik({
      mapPropsToValues: () => ({
        email: '',
        password: '',
      }),
      validationSchema: object({
        email: string('')
          .email('errorMessages.email')
          .required('errorMessages.required'),
        password: string('').required('errorMessages.required'),
      }),
    })(LoginPage)
  )
);
