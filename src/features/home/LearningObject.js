import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

export class LearningObject extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        fileName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    url: null,
  }

  componentWillMount() {
    this.setState({
      url: `http://localhost/renderer/${this.props.match.params.fileName}`,
    });
  }

  render() {
    return (
      <div className="home-learning-object">
        <center>
          <iframe src={this.state.url} height="500" width="800" title="hola" />
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
)(LearningObject);
