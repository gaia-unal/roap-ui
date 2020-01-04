import React from 'react';
import { AppBar, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from "@material-ui/core/styles";
const Logo = props => (
  <img src="images/roap_logo.png" style={{ width: 100, height: 50 }} alt="Logo ROAp"/>
);

const styles = {
  spacer: {
    flex: 1
  }
};
const CustomAppBar = withStyles(styles)(({ classes, translate,...props }) => (
  <AppBar
    {...props}
    style={{ background: '#F1F1F1', color: 'black' }}
  >
    <Logo />
    <span className={classes.spacer} />
    <MenuItemLink to="/configuration" leftIcon={<SettingsIcon />}/>
  </AppBar>
));

export default CustomAppBar;
