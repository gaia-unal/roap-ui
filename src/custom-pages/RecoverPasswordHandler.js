import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import userService from '../custom-services/user';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactJson from 'react-json-view';
import { withFormik } from 'formik';
import { object, string, ref } from 'yup';
import { translate } from 'react-admin';

const user = new userService();

class RecoverPasswordHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMessage: '',
    };
  }

  submit = credentials => {
    user.recoverPasswordUserAccount(
      this.props.match.params.token,
      credentials.password,
      res => this.props.push('/learning-object-collection'),
      err => this.setState({ showErrorMessage: JSON.parse(err.response.text) })
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
          flexDirection: 'column',
        }}
      >
        <Dialog
          open={this.state.showErrorMessage !== ''}
          onClose={() => this.setState({ showErrorMessage: '' })}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Error</DialogTitle>
          <DialogContentText>
            <ReactJson src={this.state.showErrorMessage} />
          </DialogContentText>
        </Dialog>
        <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label={translate('ra.auth.password')}
            name="password"
            type="password"
            value={values.password}
            helperText={touched.password ? translate(errors.password) : ''}
            error={touched.password && Boolean(errors.password)}
            onChange={this.change.bind(null, 'password')}
            required
          />
          <TextField
            name="passwordConfirm"
            value={values.passwordConfirm}
            helperText={touched.passwordConfirm ? translate(errors.passwordConfirm) : ''}
            error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
            label={translate('auth.confirm_password')}
            type="password"
            autoComplete="current-password"
            onChange={this.change.bind(null, 'passwordConfirm')}
            required
          />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: 10 }}
            disabled={!isValid}
            onClick={() => this.submit(this.props.values)}
          >
            {translate('auth.change_password')}
          </Button>
        </Paper>
        <br />
        <br />
      </div>
    );
  }
}

export default connect(
  undefined,
  { push }
)(
  translate(
    withFormik({
      mapPropsToValues: () => ({
        password: '',
        confirmPassword: '',
      }),
      validationSchema: object({
        password: string('')
          .min(8, 'errorMessages.passwordLen')
          .required('errorMessages.required'),
        passwordConfirm: string('')
          .oneOf([ref('password'), null], 'errorMessages.passwordConfirm')
          .required('errorMessages.required'),
      }),
    })(RecoverPasswordHandler)
  )
);
