import React from 'react';
import { AppBar, UserMenu, MenuItemLink, translate } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from "@material-ui/core/styles";

const Logo = props => (
  <img src="images/roap_logo.png" style={{ width: 100, height:70 }} alt="Logo ROAp"/>
);

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
    style={{ background: '#F1F1F1', color: 'black' }}
    userMenu={<CustomUserMenu />}
  >
    <Logo />
    <span className={classes.spacer} />
  </AppBar>
));

export default CustomAppBar;
