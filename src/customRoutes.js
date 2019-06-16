import React from 'react';
import { Route } from 'react-router-dom';
import SignupPage from './custom-pages/SignupPage';
import LoginPage from './custom-pages/LoginPage';
import CollectionCreate from './custom-pages/CollectionCreate';
import Configuration from './custom-pages/Configuration';

import UserValidationHandler from './custom-pages/UserValidationHandler';
import RecoverPasswordHandler from './custom-pages/RecoverPasswordHandler';

export default [
  <Route exact path="/configuration" component={Configuration} />,
  <Route exact path="/signup" component={SignupPage} />,
  <Route exact path="/login" component={LoginPage} />,
  <Route exact path="/user-validate/:token" component={UserValidationHandler} />,
  <Route exact path="/recover-password/:token" component={RecoverPasswordHandler} />,
  <Route exact path="/collection/create" component={CollectionCreate} />
];
