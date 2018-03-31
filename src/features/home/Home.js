import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
      <div style={{ paddingTop: '4em', paddingBottom: '5em' }}>
        <PrincipalBar />
        {this.props.home.user && (
          <div style={{ position: 'fixed', bottom: '3%', right: '3px', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
            <FloatingActionButton style={{ margin: '5px' }} onClick={() => { this.setState({ floatingButtonOpen: !this.state.floatingButtonOpen }); }}>
              <ContentAdd />
            </FloatingActionButton>
            {this.state.floatingButtonOpen && (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center' }}>
                <FloatingActionButton style={{ margin: '5px' }} mini secondary>
                  <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton style={{ margin: '5px' }} mini secondary>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            )}
          </div>
        )}

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
