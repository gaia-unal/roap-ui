import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import * as actions from './redux/actions';

export class UserList extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList() {
    // TODO: change offset and count
    this.props.actions.getUserList({
      query: {
        role: 'unknown',
        offset: this.props.home.offset,
        count: this.props.home.count,
      },
      token: this.props.home.user.token,
    });
  }

  render() {
    return (
      <div className="home-user-list">
        <center>
          <Paper zDepth={4} style={{ marginRight: '5%', marginLeft: '5%', height: '70%', padding: 10, minWidth: '480px' }}>
            <List>
              {_.map(this.props.home.userList, (us, id) => (
                <div key={id}>
                  <ListItem
                    style={{ textAlign: 'left', padding: '15px' }}
                    primaryText={<pre> {JSON.stringify(us, undefined, 4)} </pre>}
                  />
                  <Divider inset />
                </div>
              ))}
            </List>
          </Paper>
        </center>
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
)(UserList);
