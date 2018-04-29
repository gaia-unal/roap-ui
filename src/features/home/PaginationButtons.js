import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { grey300, blueGrey700, grey900, blue500 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Avatar from 'material-ui/Avatar';

import * as actions from './redux/actions';

export class PaginationButtons extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  // window.scrollTo(0, 0);

  render() {
    return (
      <div
        style={{
          padding: '2px',
          zIndex: 1,
          position: 'fixed',
          bottom: '10px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <FloatingActionButton
          backgroundColor={blueGrey700}
          style={{ marginRight: '10px' }}
          onClick={() => {
            if (!this.props.home.getLearningObjectListPending) {
              const promise = new Promise((resolve) => {
                resolve(this.props.actions.goToPreviousPage());
              });
              promise.then(() => {
                this.props.actions.getLearningObjectList({
                  offset: this.props.home.offset,
                  count: this.props.home.count,
                  textSearch: this.props.home.textSearch,
                });
              });
            }
          }}
          disabled={
            this.props.home.page < 2
          }
        >
          <HardwareKeyboardArrowLeft />
        </FloatingActionButton>
        <Avatar size={30} style={{ background: grey300 }}>
          <p style={{ color: grey900 }}>{this.props.home.page}</p>
        </Avatar>
        <FloatingActionButton
          backgroundColor={blueGrey700}
          style={{ marginLeft: '10px' }}
          onClick={() => {
            if (!this.props.home.getLearningObjectListPending) {
              const promise = new Promise((resolve) => {
                resolve(this.props.actions.goToNextPage());
              });
              promise.then(() => {
                this.props.actions.getLearningObjectList({
                  offset: this.props.home.offset,
                  count: this.props.home.count,
                  textSearch: this.props.home.textSearch,
                });
              });
            }
          }}
          disabled={
            this.props.home.learningObjectList.length < this.props.home.count
          }
        >
          <HardwareKeyboardArrowRight />
        </FloatingActionButton>
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
)(PaginationButtons);
