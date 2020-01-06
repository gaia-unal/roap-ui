import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import userService from '../custom-services/user';
import { push } from 'connected-react-router';
import { useTranslate, TextInput, email, required, minLength, useNotify } from 'react-admin';
import { Form, Field } from 'react-final-form';


const user = new userService();


const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  forvalidate,
  ...props
}) => (
    <TextInput
      {...inputProps}
      {...props}
      validate={forvalidate}
      fullWidth
    />
  )


const SignUpPage = ({ push, validate }) => {
  const translate = useTranslate();
  const notify = useNotify();
  const validatePassword = (value, allValues) => {
    return value !== allValues.password;
  }

  const handleSubmit = (credentials) => {
    credentials.requestedRole = 'creator';
    user.post(
      credentials.email,
      credentials.password,
      credentials.name,
      credentials.requestedRole,
      res =>
        user.sendUserEmail(
          credentials.email,
          res => {
            push('/learning-object-collection');
            notify(translate('signUp.welcome'))

          },
          err => console.log(err)
        ),
      err => {
        notify(JSON.parse(err.response.text).message)
      }
    );
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
      <Paper style={{ width: 250, padding: 20, display: 'flex', flexDirection: 'column' }}>
        <Form
          onSubmit={handleSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                label="Email"
                name="email"
                type="email"
                component={renderInput}
                forvalidate={[required(), email()]}
              />
              <Field
                label={translate('user.name')}
                name="name"
                type="text"
                component={renderInput}
                forvalidate={[required(), minLength(3)]}
              />
              <Field
                label={translate('ra.auth.password')}
                name="password"
                type="password"
                component={renderInput}
                forvalidate={[required(), minLength(6)]}
              />
              <Field
                label={translate('ra.auth.password')}
                name="passwordConfirm"
                type="password"
                component={renderInput}
                forvalidate={[required(), validatePassword]}
              />
              <Button
                variant="outlined"
                style={{ marginTop: '10px' }}
                color="primary"
                type="submit"
              >
                {translate('auth.sign_up')}
              </Button>
            </form>
          )}
        />
      </Paper>
    </div>
  );
}


export default connect(
  null,
  { push }
)(SignUpPage)
