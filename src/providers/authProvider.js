import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS } from 'react-admin';
import decodeJwt from 'jwt-decode';
import jwt from 'jwt-simple';
import { openNotification } from '../notification';
import { openGetValidateAccountToken } from '../getValidateAccountToken';
import { push } from 'react-router-redux';
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { translate } from 'react-admin';

const _SignUpButton = ({ message, push, translate }) => (
  <Button key="signup" onClick={() => push('/signup')}>
    {translate(message)}
  </Button>
);

const SignUpButton = connect(
  null,
  {
    push,
  }
)(translate(_SignUpButton));

const _GetValidateAccountButton = ({ message, translate }) => (
  <Button key="signup" onClick={() => openGetValidateAccountToken()}>
    {translate(message)}
  </Button>
);

const GetValidateAccountButton = connect(
  null,
  {
    push,
  }
)(translate(_GetValidateAccountButton));

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { email, password } = params;
    const request = new Request(
      `${process.env.NODE_ENV === 'production' ? '/v1/user-login' : 'http://localhost:8081/v1/user-login'}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      }
    );
    return fetch(request)
      .then(response => {
        switch (response.status) {
          case 404:
            response.json().then(json =>
              openNotification({
                message: json.message,
                variant: 'error',
                duration: null,
                action: <SignUpButton message="auth.sign_up" />,
              })
            );
            return Promise.reject();
          case 401:
            response.json().then(json =>
              openNotification({
                message: json.message,
                variant: 'error',
                duration: null,
                action: <GetValidateAccountButton message="action.resend" />,
              })
            );
            return Promise.reject();
          case 403:
            response.json().then(json =>
              openNotification({
                message: json.message,
                variant: 'error',
                duration: null,
              })
            );
            return Promise.reject();
          case 500:
            response.json().then(json =>
              openNotification({
                message: json.message,
                variant: 'error',
                duration: null,
              })
            );
            return Promise.reject();
          default:
            break;
        }

        return response.json();
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
      });
  }
  if (type === AUTH_LOGOUT) {
    const payload = {
      _id: 'external_user',
      deleted: false,
      validated: false,
      status: null,
      role: 'external',
      name: 'unnamed',
    };

    var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');

    localStorage.setItem('token', jwt.encode(payload, secret, false, 'HS256'));
    localStorage.setItem('role', 'external');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    // ...
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  }
  // return Promise.reject('Unkown method');
};
