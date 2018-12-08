import React from 'react';
import { Layout } from 'react-admin';
import Menu from './Menu';

const MyLayout = (props) => {
  return <Layout
    menu={Menu}
    {...props}
  />;
};

export default MyLayout;