import React from 'react';
import { connect } from 'react-redux';
import { Responsive, userLogout } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import { push } from 'react-router-redux';
import LabelIcon from '@material-ui/icons/Label';


const MyLogoutButton = ({ userLogout, push, ...rest }) => {
    return localStorage.getItem('role') !== 'external' ? <Responsive
        xsmall={
            <MenuItem
                onClick={() => userLogout('/login')}
            >
                <ExitIcon /> Logout
            </MenuItem>
        }
        medium={
            <Button
                onClick={() => userLogout('/login')}
                size="small"
            >
                <ExitIcon /> Logout
            </Button>
        }
    /> : <React.Fragment>
        <MenuItem
            onClick={() => push('/login')}
        >
          <LabelIcon /> Login
        </MenuItem>
        <MenuItem
            onClick={() => push('/signup')}
        >
          <LabelIcon /> Signup
        </MenuItem>
    </React.Fragment>
};
export default connect(null, { userLogout: userLogout, push: push })(MyLogoutButton);
