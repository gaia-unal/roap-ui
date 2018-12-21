import React from 'react';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

let openNotificationFn;

const notificationStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  }
});

class Notification extends React.Component {
  state = {
    open: false,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    action: []
  };

  handleOpenClick = ({ variant, message, anchorOrigin, action }) => {
    this.setState({
      open: true,
      variant: variant,
      message: message,
      anchorOrigin: anchorOrigin,
      action: action
    });
  };

  handleCloseClick = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    openNotificationFn = this.handleOpenClick;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          open={ this.state.open }
          style={{ whiteSpace: 'nowrap' }}
          autoHideDuration={ this.state.autoHideDuration }
          anchorOrigin={ this.state.anchorOrigin }>
          <SnackbarContent
            className={classNames(classes[this.state.variant])}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">
                {this.state.message}
              </span>
            }
            action={[
              this.state.action,      
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseClick}>
                <CloseIcon/>
              </IconButton>
            ]}/>
        </Snackbar>
      </div>
    );
  }
}

export function openNotification(preferences) {
  openNotificationFn(preferences)
} 

export default withStyles(notificationStyles)(Notification);
