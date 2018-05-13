import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import SearchBar from 'material-ui-search-bar';

import Paper from 'material-ui/Paper';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { grey200 } from 'material-ui/styles/colors';

import * as actions from './redux/actions';

import banner from './images/banner.png';

export class PrincipalBar extends Component {
    static propTypes = {
      home: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
      searchField: PropTypes.bool.isRequired,
    };

    state = {
      showLogin: false,
      showSignin: false,
      showNewUsers: false,
      showCreateLearningObject: false,
      textSearch: '',
    }

    // TODO: logout

    getUserMenu() {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton
              tooltip={this.props.home.user ? this.props.home.user.name : 'user options'}
              tooltipPosition="bottom-left"
            >
              <ActionAccountCircle />
            </IconButton>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          {this.props.home.user ? (
            <div>
              <MenuItem
                primaryText="Log out"
                onClick={() => {
                  this.props.actions.logoutUser();
                }}
              />
              <MenuItem
                primaryText="Create learning object"
                onClick={() => this.setState({
                  showCreateLearningObject: !this.state.showCreateLearningObject
                })}
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
                onClick={() => this.setState({
                  showLogin: !this.state.showLogin
                })}
              />
              <MenuItem
                primaryText="Sign in"
                onClick={() => this.setState({
                  showSignin: !this.state.showSignin
                })}
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
              <Paper style={{ background: grey200 }}>
                <img
                  src={banner}
                  width="200"
                  alt="-"
                />
              </Paper>
            </ToolbarGroup>
            <ToolbarGroup className="search-bar">
              {this.props.searchField && (
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
              )}
            </ToolbarGroup>
            <ToolbarGroup lastChild float="right">
              <b>
                {this.props.home.user && this.props.home.user.name}
              </b>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
              {this.getUserMenu()}
              <IconButton
                tooltip="Collections"
                tooltipPosition="bottom-left"
              >
                <ViewList />
              </IconButton>
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
