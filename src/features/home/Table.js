import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import _ from 'lodash';
import request from 'superagent';

import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class LearningObjectService {
  constructor() {
    this.url = 'http://localhost/back/object?offset=0&count=50';
  }

  get(then) {
    request
      .get(this.url)
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

  render() {
    return (
      <div className="home-table">
        <center>
          <Paper zDepth={4} style={{ width: '50%', height: '70%', padding: 25 }}>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn><big>General Identifier</big></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {_.map(this.state.learningObjectList, (lo, id) => (
                  <TableRow key={id}>
                    <TableRowColumn>{JSON.stringify(lo.metadata.general.identifier)}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
