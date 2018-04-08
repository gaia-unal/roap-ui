import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import SearchBar from 'material-ui-search-bar';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import * as actions from './redux/actions';

export class PrincipalBar extends Component {
    static propTypes = {
      home: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
    };

    state = {
      showLogin: false,
      showSignin: false,
      showNewUsers: false,
      showCreateLearningObject: false,
      textSearch: '',
    }

    getUserMenu() {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton> <ActionAccountCircle /> </IconButton>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          {this.props.home.user ? (
            <div>
              <MenuItem
                primaryText="Log out"
              />
              <MenuItem
                primaryText="Create learning object"
                onClick={() => {
                  this.setState({ showCreateLearningObject: !this.state.showCreateLearningObject });
                }}
              />
              {this.props.home.user.role === 'administrator' && (
                <MenuItem
                  primaryText="New users"
                  onClick={() => {
                    this.setState({ showNewUsers: !this.state.showNewUsers });
                  }}
                />
              )}
            </div>
          ) : (
            <div>
              <MenuItem
                primaryText="Log in"
                onClick={() => {
                  this.setState({ showLogin: !this.state.showLogin });
                }}
              />
              <MenuItem
                primaryText="Sign in"
                onClick={() => {
                  this.setState({ showSignin: !this.state.showSignin });
                }}
              />
            </div>
          )}
        </IconMenu>
      );
    }

    render() {
      return (
        <div className="home-principal-bar">
          {this.state.showLogin && <Redirect push to="/login" />}
          {this.state.showSignin && <Redirect push to="/signin" />}
          {this.state.showNewUsers && <Redirect push to="/user-list" />}
          {this.state.showCreateLearningObject && <Redirect push to="/create-learning-object" />}
          <Toolbar className="home-tool-bar">
            <ToolbarGroup firstChild float="left">
              <IconButton
                tooltip={this.props.home.userToken || 'Anonymus'}
                tooltipPosition="bottom-right"
              >
                <ViewList />
              </IconButton>
            </ToolbarGroup>
            <ToolbarGroup className="search-bar">
              <SearchBar
                onChange={(s) => { this.setState({ textSearch: s }); }}
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
              <b>
                {this.props.home.user ? this.props.home.user.name : 'Anonymus'}
              </b>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
              {this.getUserMenu()}
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
