// in src/App.js
import React from 'react';

import { LearningObjectList } from './learning-object/LearningObjectList';
import { LearningObjectShow } from './learning-object/LearningObjectShow';
import { LearningObjectEdit } from './learning-object/LearningObjectEdit';

import { UserList } from './user/UserList';

import { Admin, Resource } from 'react-admin';

import customRoutes from './customRoutes';

import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

import LoginPage from './custom-pages/LoginPage';

import Layout from './Layout';

import Book from '@material-ui/icons/Book';

import LogoutButton from './LogoutButton';

const BACKEND_HOST = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'}`

const App = () => (
  <Admin
    dataProvider={dataProvider(BACKEND_HOST)}
    authProvider={authProvider}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
    customRoutes={customRoutes}
    appLayout={Layout}
    title="Roap"
  >
    {permissions => [
      <Resource
        name="learning-object-collection"
        list={LearningObjectList}
        show={LearningObjectShow}
        edit={LearningObjectEdit}
        options={{ label: 'Learning Objects' }}
        icon={Book}
      />,
      permissions === 'administrator' && <Resource
        name="user-collection"
        list={UserList}
        options={{ label: 'Users' }}
        icon={Book}
      />
    ]}
  </Admin>
);

export default App;