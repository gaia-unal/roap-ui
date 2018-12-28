import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { push } from 'react-router-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { showNotification } from 'react-admin';

import { translate } from 'react-admin';
import GetRecoverPassword from '../getRecoverPassword';
import { Formik } from "formik";
import { LoginForm } from '../loginForm';
import * as Yup from 'yup';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log("HAHA")
    this.props.userLogin({
      ...credentials
    });
  }

  render() {
    const { translate, push } = this.props;
    const validationSchema = Yup.object({
      email: Yup.string('')
      .email(translate('errorMessages.email'))
      .required(translate('errorMessages.required')),
      password: Yup.string('')
      .required(translate('errorMessages.required'))});

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
          translate={translate}
          close={ () => this.handleClickClose.bind(this) }>
        </GetRecoverPassword>
        <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            render={props => <LoginForm {...props} submitHandler={ this.submit } translate={ translate }/>}
            validationSchema={ validationSchema }/>
            <Button
              onClick={() => this.handleClickOpen()}
              variant="outlined"
              color="primary" 
              style={{ marginTop: 10 }}>
              { translate("recover_password.forgot_your_password") }
            </Button>
        </Paper>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: 10 }}
          onClick={ () => push('/learning-object-collection') }>
          { translate('lo.go_to') }
        </Button>
      </div>
    );
  }
};

export default connect(null, { userLogin, push, showNotification })(translate(LoginPage));
