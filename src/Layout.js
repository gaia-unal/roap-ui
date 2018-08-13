import React from 'react';
import { Layout } from 'react-admin';
import Menu from './Menu';

const MyLayout = (props) => {
  return <Layout
    {...props}
    menu={Menu}
  />;
};

export default MyLayout;