import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import LearningObjectList from './LearningObjectList';
import PrincipalBar from './PrincipalBar';
import PaginationButtons from './PaginationButtons';


export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    floatingButtonOpen: false,
  };

  render() {
    return (
      <div
        style={{ paddingTop: '4em', paddingBottom: '5em' }}
      >
        <PrincipalBar searchField />
        <LearningObjectList />
        <PaginationButtons />
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
