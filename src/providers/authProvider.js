import decodeJwt from 'jwt-decode';
import jwt from 'jwt-simple';

export default {
  login: params => {
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
      .then(async (response) => {
        switch (response.status) {
          case 404:
          case 401:
          case 403:
          case 500:
            const res = await response.json()
            return Promise.reject(res);
          default:
            break;
        }
        return response.json();
      }).then(({ token }) => {
        const decodedToken = decodeJwt(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
      });
  },
  logout: params => {
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
  },
  checkAuth: params => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  checkError: error => Promise.resolve(),
  getPermissions: params => {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  }
}

