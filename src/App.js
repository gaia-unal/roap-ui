// in src/App.js
import React from 'react';

import { LearningObjectList } from './learning-object/LearningObjectList';
import { LearningObjectShow } from './learning-object/LearningObjectShow';
import { LearningObjectEdit } from './learning-object/LearningObjectEdit';
import { LearningObjectCreate } from './learning-object/LearningObjectCreate';

import { UserList } from './user/UserList';
import { UserCreate } from './user/UserCreate';
import { UserEdit } from './user/UserEdit';

import { Admin, Resource } from 'react-admin';

import customRoutes from './customRoutes';

import addUploadFeature from './addUploadFeature';

import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

import LoginPage from './custom-pages/LoginPage';

import Layout from './Layout';

import Book from '@material-ui/icons/Book';

import LogoutButton from './LogoutButton';

const BACKEND_HOST = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'}`

const uploadCapableDataProvider = addUploadFeature(dataProvider(BACKEND_HOST));

const App = () => (
  <Admin
    dataProvider={uploadCapableDataProvider}
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
        create={LearningObjectCreate}
        options={{ label: 'Learning Objects' }}
        icon={Book}
      />,
       permissions === 'administrator' && <Resource
        name="user-collection"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        options={{ label: 'Users' }}
        icon={Book}
      />
    ]}
  </Admin>
);

export default App;