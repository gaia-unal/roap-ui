import React from 'react';
import { AppBar, UserMenu, MenuItemLink, translate } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from "@material-ui/core/styles";

const CustomUserMenu = translate(({ translate, ...props }) => (
  <UserMenu {...props}>
    <MenuItemLink to="/configuration" primaryText={translate('tabs_name.configuration')} leftIcon={<SettingsIcon />} />
  </UserMenu>
));
const styles = {
  spacer: {
    flex: 1
  }
};
const CustomAppBar = withStyles(styles)(({ classes, ...props }) => (
  <AppBar
    {...props}
    userMenu={<CustomUserMenu />}
  >
    <h1>ROAp</h1>
    <span className={classes.spacer} />
  </AppBar>
));

export default CustomAppBar;
