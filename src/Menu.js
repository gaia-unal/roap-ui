import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';

import Divider from '@material-ui/core/Divider';

const Menu = ({ resources, onMenuClick, logout }) => {
  return <div>
    {resources.map((resource, id) => (
      <MenuItemLink
        key={id}
        to={`/${resource.name}`}
        primaryText={resource.options.label}
        leftIcon={createElement(resource.icon)}
        onClick={onMenuClick}
      />
    ))}
    <Divider />
    <MenuItemLink
      to={'/login'}
      primaryText={'Login'}
      leftIcon={<LabelIcon />}
      onClick={onMenuClick}
    />
    <MenuItemLink
      to={'/signup'}
      primaryText={'Signup'}
      leftIcon={<LabelIcon />}
      onClick={onMenuClick}
    />
    <Responsive xsmall={logout} medium={null} />
  </div>
};

const mapStateToProps = state => ({
  resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));