import React from 'react';
import { connect } from 'react-redux';
import { userLogout, translate } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { push } from 'react-router-redux';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PersonAdd from '@material-ui/icons/PersonAdd';


const MyLogoutButton = ({ translate, userLogout, push, ...rest }) => {
    return localStorage.getItem('role') !== 'external' ? (
        <MenuItem
            onClick={() => userLogout('/login')}
        >
            <PowerSettingsNew /> { translate('ra.auth.logout') }
        </MenuItem>
    ) : (
        <React.Fragment>
            <MenuItem
                onClick={() => push('/login')}
            >
              <ExitToApp /> { translate('ra.auth.sign_in') }
            </MenuItem>
            <MenuItem
                onClick={() => push('/signup')}
            >
              <PersonAdd /> { translate('auth.sign_up') }
            </MenuItem>
        </React.Fragment>
    )
};
export default connect(null, { userLogout: userLogout, push: push })(translate(MyLogoutButton));
