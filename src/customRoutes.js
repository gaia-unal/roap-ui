import React from 'react';
import { Route } from 'react-router-dom';
import SignupPage from './custom-pages/SignupPage';
import LoginPage from './custom-pages/LoginPage';

export default [
  <Route exact path="/signup" component={SignupPage} />,
  <Route exact path="/login" component={LoginPage} />,
];