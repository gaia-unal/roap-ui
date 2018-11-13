import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { push } from 'react-router-redux';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PersonAdd from '@material-ui/icons/PersonAdd';


const MyLogoutButton = ({ userLogout, push, ...rest }) => {
    return localStorage.getItem('role') !== 'external' ? (
        <MenuItem
            onClick={() => userLogout('/login')}
        >
            <PowerSettingsNew /> Logout
        </MenuItem>
    ) : (
        <React.Fragment>
            <MenuItem
                onClick={() => push('/login')}
            >
              <ExitToApp /> Login
            </MenuItem>
            <MenuItem
                onClick={() => push('/signup')}
            >
              <PersonAdd /> Signup
            </MenuItem>
        </React.Fragment>
    )
};
export default connect(null, { userLogout: userLogout, push: push })(MyLogoutButton);
