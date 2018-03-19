import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import _ from 'lodash';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';


class LearningObjectService {
  constructor() {
    this.url = 'http://localhost/back/object';
  }

  get(then) {
    request
      .get(this.url)
      .query({ offset: 0, count: 10 })
      .end((err, res) => {
        if (!err) then(res);
        else console.error(err);
      });
  }
}

export class LearningObjectTable extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  learningObjectService = new LearningObjectService();

  state = {
    learningObjectList: []
  };

  componentDidMount() {
    this.learningObjectService.get(res => this.setState({
      learningObjectList: res.body
    }));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ learningObjectList: nextProps.learningObjectList });
  }

  render() {
    return (
      <div className="home-table">
        <center>
          <Paper zDepth={4} style={{ width: '50%', height: '70%', padding: 25, minWidth: '480px' }}>
            <List>
              {_.map(this.state.learningObjectList, (lo, id) => (
                <ListItem
                  key={id}
                  primaryText={lo.metadata.general.title}
                  secondaryText={lo.created}
                  leftAvatar={
                    <Avatar size={50} style={{ fontSize: '20px' }}>
                    {String(lo.metadata.technical.format).substring(0, 3)}
                    </Avatar>
                  }
                  rightIcon={
                    <ActionInfo
                      onClick={() => { console.log('holi'); }}
                    />
                  }
                />
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
)(LearningObjectTable);
