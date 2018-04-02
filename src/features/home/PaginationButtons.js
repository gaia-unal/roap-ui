import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Paper from 'material-ui/Paper';
import { blueGrey300, blueGrey600 } from 'material-ui/styles/colors';
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
      <Paper
        style={{
          background: blueGrey300,
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
          mini
          style={{ marginRight: '10px' }}
          onClick={() => {
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
          }}
          disabled={this.props.home.page < 2}
        >
          <HardwareKeyboardArrowLeft />
        </FloatingActionButton>
        <Avatar size={30} style={{ background: blueGrey600 }}>
          {this.props.home.page}
        </Avatar>
        <FloatingActionButton
          mini
          style={{ marginLeft: '10px' }}
          onClick={() => {
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
          }}
          disabled={this.props.home.learningObjectList.length < this.props.home.count}
        >
          <HardwareKeyboardArrowRight />
        </FloatingActionButton>
      </Paper>
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
