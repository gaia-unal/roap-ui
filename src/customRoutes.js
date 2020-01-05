import React from 'react';
import { Route } from 'react-router-dom';
import SignupPage from './custom-pages/SignupPage';
import MyLoginPage from './custom-pages/LoginPage';
import Configuration from './custom-pages/Configuration';

import UserValidationHandler from './custom-pages/UserValidationHandler';
import RecoverPasswordHandler from './custom-pages/RecoverPasswordHandler';

export default [
  <Route exact path="/configuration" component={Configuration} />,
  <Route exact path="/signup" component={SignupPage} />,
  <Route exact path="/login" component={MyLoginPage} />,
  <Route exact path="/user-validate/:token" component={UserValidationHandler} />,
  <Route exact path="/recover-password/:token" component={RecoverPasswordHandler} />,
];
