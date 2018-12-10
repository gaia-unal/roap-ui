import React from 'react';
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';

const MyLayout = (props) => {
  return <Layout
    menu={Menu}
    appBar={AppBar}
    {...props}
  />;
};

export default MyLayout;