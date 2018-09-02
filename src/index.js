import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import jwt from 'jwt-simple';


if(!localStorage.getItem('token')) {
  const payload = {
    '_id': 'external_user',
    'deleted': false,
    'validated': false,
    'status': null,
    'role': 'external',
    'name': 'unnamed',
  }

  var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex');

  localStorage.setItem('token', jwt.encode(payload, secret, false, 'HS256'))
  localStorage.setItem('role', 'external')
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
