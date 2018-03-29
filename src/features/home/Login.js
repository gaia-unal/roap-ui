import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import * as actions from './redux/actions';

export class Login extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.props.onSuccess}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.props.actions.logIn}
      />,
    ];

    return (
      <div className="home-login">
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.onCancel}
        >
          <TextField
            hintText="Email"
            floatingLabelText="Email"
          />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
          />
        </Dialog>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
