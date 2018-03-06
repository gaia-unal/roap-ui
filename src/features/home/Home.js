import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Logged from './Logged';
import Login from './Login';
import Table from './Table';


export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    logged: false,
    showLogin: false,
  };

  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconElementRight={
            this.state.logged ? (
              <Logged
                onSignOut={() => {
                  this.setState({ logged: !this.state.logged });
                }}
              />
            ) : (
              <FlatButton
                label="Login"
                onClick={() => {
                  this.setState({ showLogin: !this.state.showLogin });
                }}
              />
            )
          }
        />
        <Login
          open={this.state.showLogin}
          onSubmit={() => {
            this.setState({
              logged: !this.state.logged,
              showLogin: !this.state.showLogin
            });
          }}
          onCancel={() => {
            this.setState({ showLogin: !this.state.showLogin });
          }}
        />
        <Table />
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
