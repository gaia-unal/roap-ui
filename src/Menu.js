import React, { createElement } from 'react';
import { MenuItemLink, getResources } from 'react-admin';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';


const Menu = ({  onMenuClick, logout }) => {
  const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const resources = useSelector(getResources);
  const open = useSelector(state => state.admin.ui.sidebarOpen);
  return (
    <div>
      {resources.map((resource, id) => (
        <MenuItemLink
          key={id}
          to={`/${resource.name}`}
          primaryText={resource.options.label}
          leftIcon={createElement(resource.icon)}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      <Divider />
      {isXSmall && logout}
    </div>
  );
};


export default withRouter(Menu);
