import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

import { Redirect } from 'react-router';

import * as actions from './redux/actions';

export class UserValidate extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.actions.userValidate({
      token: this.props.match.params.token,
    });
  }

  render() {
    return (
      <div className="home-user-validate">
        {this.props.home.userValidatePending && <Redirect push to="/login" />}
        <Dialog
          title="Validating"
          open={this.props.home.userValidatePending}
        >
          <p>Wait for user validation.</p>
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
)(UserValidate);
