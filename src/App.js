// in src/App.js
import React from 'react';

import LearningObjectList  from './learning-object/LearningObjectList';
import LearningObjectShow from './learning-object/LearningObjectShow';
import { LearningObjectEdit } from './learning-object/LearningObjectEdit';
import { LearningObjectCreate } from './learning-object/LearningObjectCreate';

import { UserList } from './user/UserList';
import { UserCreate } from './user/UserCreate';
import { UserEdit } from './user/UserEdit';

import { Admin, Resource } from 'react-admin';
import englishMessages from './i18n/en';
import spanishMessages from './i18n/es';
import portugueseMessages from './i18n/pt';

import customRoutes from './customRoutes';

import addUploadFeature from './addUploadFeature';

import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

import LoginPage from './custom-pages/LoginPage';

import Layout from './Layout';

import Book from '@material-ui/icons/Book';

import LogoutButton from './LogoutButton';

const BACKEND_HOST = `${process.env.NODE_ENV === 'production' ? '/v1' : 'http://localhost:8081/v1'}`

const uploadCapableDataProvider = addUploadFeature(dataProvider(BACKEND_HOST));

const messages = {
  es: spanishMessages,
  en: englishMessages,
  pt: portugueseMessages
};

const i18nProvider = locale => messages[locale];


const App = () => (
  <Admin
    dataProvider={uploadCapableDataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
    customRoutes={customRoutes}
    appLayout={Layout}
    title='Roap'
    locale='es'
    i18nProvider={i18nProvider}
  >
    {permissions => [
      <Resource
        name="learning-object-collection"
        list={LearningObjectList}
        show={LearningObjectShow}
        {...(localStorage.getItem('role') !== 'external' ? {create: LearningObjectCreate, edit: LearningObjectEdit} : {})}
        options={{ label: 'lo.all' }}
        icon={Book}
      />,
      permissions === 'administrator' && <Resource
        name="user-collection"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        options={{ label: 'auth.users' }}
        icon={Book}
      />
    ]}
  </Admin>
);

export default App;