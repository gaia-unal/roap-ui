import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
        style={{ margin: '20%' }}
      >
        {JSON.stringify(this.props.home.learningObjectMetadataSchema)}
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
