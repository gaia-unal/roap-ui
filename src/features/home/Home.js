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
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import Logged from './Logged';
import Login from './Login';
import Table from './Table';

import LearningObjectCollectionService from './services/learningObject';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    logged: false,
    showLogin: false,
    textSearch: '',
    learningObjectList: [],
    floatingButtonOpen: false,
    offset: 0,
    count: 6,
    page: 1,
  };

  learningObjectService = new LearningObjectCollectionService();

  getLearningObjectList() {
    this.learningObjectService.get(
      this.state.offset,
      this.state.count,
      this.state.textSearch,
      res => this.setState({
        learningObjectList: res.body
      })
    );
  }

  componentDidMount() {
    this.getLearningObjectList();
  }

  render() {
    return (
      <div>
        <div style={{ position: 'fixed', bottom: '3%', right: '50%', marginRight: '-106px', display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <FloatingActionButton
            style={{ margin: '10px' }}
            onClick={ () => {
              this.setState(
                { offset: this.state.offset - this.state.count, page: this.state.page - 1 },
                () => {this.getLearningObjectList();}
              );
            }}
            disabled={this.state.offset==0}
          >
            <HardwareKeyboardArrowLeft />
          </FloatingActionButton>
          <Avatar style={{ margin: '10px' }}>
            {this.state.page}
          </Avatar>
          <FloatingActionButton
            style={{ margin: '10px' }}
            onClick={ () => {
              this.setState(
                { offset: this.state.offset + this.state.count, page: this.state.page + 1 },
                () => {this.getLearningObjectList();}
              );
            }}
            disabled={this.state.learningObjectList.length<this.state.count}
          >
            <HardwareKeyboardArrowRight />
          </FloatingActionButton>
        </div>
        {this.state.logged && (
          <div style={{ position: 'fixed', bottom: '3%', right: '3px', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
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
              onRequestSearch={() => {
                this.setState(
                  { offset: 10, page: 1 },
                  () => { this.getLearningObjectList(); }
                );
              }}
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
              <IconButton
                style={{padding: '4px', width: '60', height: '60'}}
                iconStyle={{ marginRight: '20px' }}
              >
                <ActionAccountCircle
                  onClick={() => {
                    this.setState({ showLogin: !this.state.showLogin });
                  }}
                />
              </IconButton>
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
