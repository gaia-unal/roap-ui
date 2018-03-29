import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBar from 'material-ui-search-bar';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import * as actions from './redux/actions';

import Login from './Login';
import Logged from './Logged';

export class PrincipalBar extends Component {
    static propTypes = {
      home: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
    };

    state = {
      showLogin: false,
      textSearch: '',
    }

    render() {
      return (
        <div className="home-principal-bar">
          <Login
            open={this.state.showLogin}
            onSuccess={() => this.setState({ showLogin: false })}
          />
          <Toolbar className="home-tool-bar">
            <ToolbarGroup firstChild float="left">
              <IconButton>
                <ViewList />
              </IconButton>
            </ToolbarGroup>
            <ToolbarGroup className="search-bar">
              <SearchBar
                onChange={(s) => {
                  this.setState({ textSearch: s });
                }}
                onRequestSearch={() => {
                  const promise = new Promise((resolve) => {
                    resolve(this.props.actions.searchText(
                      this.state.textSearch,
                    ));
                  });
                  promise.then(() => {
                    this.props.actions.getLearningObjectList({
                      offset: this.props.home.offset,
                      count: this.props.home.count,
                      textSearch: this.state.textSearch,
                    });
                  });
                }}
                style={{ maxWidth: 800 }}
              />
            </ToolbarGroup>
            <ToolbarGroup lastChild float="right">
              {this.props.home.logged ? (
                <Logged
                  onSignOut={() => { this.props.home.onSignOut(); }}
                />
              ) : (
                <IconButton>
                  <ActionAccountCircle
                    onClick={() => {
                      this.setState({ showLogin: !this.state.showLogin });
                    }}
                  />
                </IconButton>
              )}
            </ToolbarGroup>
          </Toolbar>
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
)(PrincipalBar);
