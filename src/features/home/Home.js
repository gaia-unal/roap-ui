import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import request from 'superagent';

import SearchBar from 'material-ui-search-bar'
import FlatButton from 'material-ui/FlatButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import Logged from './Logged';
import Login from './Login';
import Table from './Table';


class LearningObjectSearchService {
  constructor() {
    this.url = 'http://localhost/back/object';
  }

  get(then, s) {
    request
      .get(this.url)
      .query({ offset: 0, count: 10, search: s })
      .end((err, res) => {
        if (!err) then(res);
        else console.error(err);
      });
  }
}


export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  learningObjectSearchService = new LearningObjectSearchService();

  state = {
    logged: false,
    showLogin: false,
    textSearch: '',
    learningObjectList: [],
    floatingButtonOpen: false,
  };

  onRequestSearch() {
    this.learningObjectSearchService.get(
      res => this.setState({ learningObjectList: res.body }),
      this.state.textSearch
    );
  }

  render() {
    return (
      <div>
        {this.state.logged && (
          <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
            <FloatingActionButton style={{ margin: '5px' }} onClick={() => { this.setState({ floatingButtonOpen: !this.state.floatingButtonOpen }); }}>
              <ContentAdd />
            </FloatingActionButton>
            {this.state.floatingButtonOpen && (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
                <FloatingActionButton style={{ margin: '5px' }} mini secondary>
                  <ContentAddBox />
                </FloatingActionButton>
                <FloatingActionButton style={{ margin: '5px' }} mini secondary>
                  <ContentAddBox />
                </FloatingActionButton>
              </div>
            )}
          </div>
        )}
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            {'Roap'}
          </ToolbarGroup>
          <ToolbarGroup style={{ float: 'none', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}>
            <SearchBar
              onChange={(s) => { this.setState({ textSearch: s }); }}
              onRequestSearch={() => { this.onRequestSearch(); }}
              style={{
                maxWidth: 800
              }}
            />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
            {this.state.logged ? (
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
            )}
          </ToolbarGroup>
        </Toolbar>
        <Login
          open={this.state.showLogin}
          onSubmit={() => {
            this.setState({
              logged: !this.state.logged,
              showLogin: !this.state.showLogin,
            });
          }}
          onCancel={() => {
            this.setState({ showLogin: !this.state.showLogin });
          }}
        />
        <Table learningObjectList={this.state.learningObjectList} />
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
