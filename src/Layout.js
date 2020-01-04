import React from 'react';
import { Layout, Sidebar } from 'react-admin';
import AppBar from './AppBar';


const CustomSidebar = (props) => <Sidebar {...props} size={1000} style={{zIndex: 10}} />;
const MyLayout = props => {
  return <Layout appBar={AppBar} sidebar={CustomSidebar} {...props} />;
};

export default MyLayout;
