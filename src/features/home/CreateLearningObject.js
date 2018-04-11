import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LearningObjectForm from './LearningObjectForm';

import _ from 'lodash';

import * as actions from './redux/actions';

export class CreateLearningObject extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const promise = this.props.actions.getLearningObjectMetadataSchema({
      token: this.props.home.user.token,
    });
    promise.then(() => {
      this.setState({ });
    });
    promise.catch(() => {
      this.setState({ });
    });
  }

  render() {
    return (
      <div
        className="home-create-learning-object"
        style={{ marginLeft: '20%' }}
      >
        {this.props.home.learningObjectMetadataSchema &&
          <div>
            <LearningObjectForm lom={this.props.home.learningObjectMetadataSchema.lom} />
          </div>
        }
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
)(CreateLearningObject);
