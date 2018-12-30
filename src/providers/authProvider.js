import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS } from 'react-admin';
import decodeJwt from 'jwt-decode';
import jwt from 'jwt-simple';

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
        if (response.status < 200 || response.status >= 300) {
          response.json().then(json => alert(JSON.stringify(json)));
          throw new Error(response.statusText);
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
