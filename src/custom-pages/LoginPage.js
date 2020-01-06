import React, { useState } from "react";
import { useLogin, useNotify, required, TextInput, SimpleForm, useTranslate, Toolbar, email as emailV, Notification } from "react-admin";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import GetRecoverPassword from '../getRecoverPassword';
import { useFormState } from 'react-final-form';

const LoginToolbar = ({ translate, submit }) => {
  const formState = useFormState();

  return (
    <Toolbar>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        style={{ marginTop: 10 }}
        onClick={submit}
        disabled={!formState.valid}
      >
        {translate('auth.sign_in')}
      </Button>

    </Toolbar>
  );

}

const MyLoginPage = ({ push }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openRecoverPasswordModal, setOpenRecoverPasswordModal] = useState(false);
  const validateEmail = [required(), emailV()];
  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();

  const submit = e => {
    e.preventDefault();
    login({ email, password }).catch((err) => {
      notify(err.message)
    });
  };
  const handleClickClose = () => {
    setOpenRecoverPasswordModal(false)
  }

  const handleClickOpen = () => {
    setOpenRecoverPasswordModal(true)
    console.log('open')
  }

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


      <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }} elevation={5}>
        <GetRecoverPassword
          open={openRecoverPasswordModal}
          translate={translate}
          close={handleClickClose}
        />
        <SimpleForm toolbar={<LoginToolbar translate={translate} submit={submit} />}>
          <TextInput
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            validate={validateEmail}
            fullWidth
          />
          <TextInput
            id="password"
            name="password"
            label={translate('ra.auth.password')}
            value={password}
            fullWidth
            onChange={e => setPassword(e.target.value)}
            type="password"
            validate={required()}
          />
        </SimpleForm>
        <Button onClick={handleClickOpen} variant="outlined" color="primary" style={{ marginTop: 10 }}>
          {translate('recover_password.forgot_your_password')}
        </Button>
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: 10 }}
        onClick={() => push('/learning-object-collection')}
      >
        {translate('lo.go_to')}
      </Button>
      <Notification />
    </div>
  );
};

export default connect(null, { push })(MyLoginPage);