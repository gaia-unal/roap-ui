// in src/App.js
import React from 'react';

import LearningObjectList from './learning-object/LearningObjectList';
import LearningObjectShow from './learning-object/LearningObjectShow';
import { LearningObjectEdit } from './learning-object/LearningObjectEdit';
import { LearningObjectCreate } from './learning-object/LearningObjectCreate';

import { UserList } from './user/UserList';
import { UserCreate } from './user/UserCreate';
import { UserEdit } from './user/UserEdit';

import { CollectionList } from './collection/CollectionList';
import { CollectionCreate } from './collection/CollectionCreate';
import { CollectionEdit } from './collection/CollectionEdit';

import { Admin, Resource } from 'react-admin';
import englishMessages from './i18n/en';
import spanishMessages from './i18n/es';
import portugueseMessages from './i18n/pt';
import Cookies from 'universal-cookie';

import customRoutes from './customRoutes';

import addUploadFeature from './addUploadFeature';

import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

import LoginPage from './custom-pages/LoginPage';

import Layout from './Layout';

import Book from '@material-ui/icons/Book';

import LogoutButton from './LogoutButton';

const BACKEND_HOST = `${process.env.NODE_ENV === 'production' ? '/v1' : 'http://192.168.1.56:8081/v1'}`;

const uploadCapableDataProvider = addUploadFeature(dataProvider(BACKEND_HOST));

const messages = {
  es: spanishMessages,
  en: englishMessages,
  pt: portugueseMessages,
};

const validLocale = {
  pt_BR: 'pt',
  es_CO: 'es',
  en_US: 'en',
};

const i18nProvider = locale => messages[locale];
const cookies = new Cookies();

const App = () => (
  <Admin
    dataProvider={uploadCapableDataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
    customRoutes={customRoutes}
    appLayout={Layout}
    title="Roap"
    locale={validLocale[cookies.get('user_lang')] || 'es'}
    i18nProvider={i18nProvider}
  >
    {permissions => [
      <Resource
        name="learning-object-collection"
        list={LearningObjectList}
        show={LearningObjectShow}
        {...(localStorage.getItem('role') !== 'external'
          ? { create: LearningObjectCreate, edit: LearningObjectEdit }
          : {})}
        options={{ label: 'lo.all' }}
        icon={Book}
      />,
      permissions === 'administrator' && (
        <Resource
          name="user-collection"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          options={{ label: 'auth.users' }}
          icon={Book}
        />
      ),
      permissions === 'administrator' ? (<Resource
        name="collection"
        list={CollectionList}
        create={CollectionCreate}
        edit={CollectionEdit}
        options={{ label: 'collections.collections' }}
        icon={Book}
      />) : (
        <Resource name="collection" />
      ),
      <Resource name="subcollection" />
    ]}
  </Admin>
);

export default App;
