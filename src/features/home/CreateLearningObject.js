import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import ActionDone from 'material-ui/svg-icons/action/done';
import Dialog from 'material-ui/Dialog';

import _ from 'lodash';

import LearningObjectForm from './LearningObjectForm';

import { darkBlack } from 'material-ui/styles/colors';

import * as actions from './redux/actions';

const acceptedFileFormats = [
  'application/zip',
  'application/pdf',
  'image/png',
  'image/jpeg',
  'video/mp4',
  'audio/mpeg',
  'application/msword',
  'application/vnd.ms-powerpoint',
];

export class CreateLearningObject extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    learningObjectMetadata: {},
    showErrorMessage: null,
    file: null,
  };

  componentDidMount() {
    const promise = this.props.actions.getLearningObjectMetadataSchema({
      token: this.props.home.user && this.props.home.user.token,
    });
    promise.then(() => {
      this.setState({ });
    });
    promise.catch(() => {
      this.setState({ });
    });
  }

  assign(obj, keyPath, value) {
    const lastKeyIndex = keyPath.length - 1;
    for (let i = 0; i < lastKeyIndex; i += 1) {
      const key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {};
      }
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  }

  updateLearningObjectMetadata(value, fields) {
    let newLearningObjectMetadata = _.cloneDeep(this.state.learningObjectMetadata);
    this.assign(
      newLearningObjectMetadata,
      fields,
      value
    );
    this.setState({
      learningObjectMetadata: newLearningObjectMetadata
    });
  }

  fileHandler(file) {
    if (_.includes(acceptedFileFormats, file.type)) {
      this.setState({ file });
    } else {
      this.setState({ showErrorMessage: 'Not accepted file format.' });
    }
  }

  handleFinish() {
    this.props.actions.createLearningObject(
      {
        file: this.state.file,
        learningObjectMetadata: this.state.learningObjectMetadata,
        token: this.props.home.user.token
      }
    );
  }

  render() {
    return (
      <div
        className="home-create-learning-object"
        style={{ marginLeft: '20%' }}
      >
        <Dialog
          title="Description"
          open={this.state.showErrorMessage !== null}
          onRequestClose={() => { this.setState({ showErrorMessage: null }); }}
        >
          <span style={{ color: darkBlack }}>{this.state.showErrorMessage}</span><br />
        </Dialog>
        {this.props.home.learningObjectMetadataSchema &&
          <Fragment>
            <LearningObjectForm
              loms={this.props.home.learningObjectMetadataSchema.lom}
              onChange={(value, fields) => { this.updateLearningObjectMetadata(value, fields); }}
              lom={this.state.learningObjectMetadata}
            />
            <RaisedButton
              containerElement="label"
              labelColor="white"
              icon={<FileFileUpload />}
              label={(this.state.file && this.state.file.name) || 'Select one file'}
              primary
            >
              <input
                onChange={e => this.fileHandler(e.target.files[0])}
                style={{ display: 'none' }}
                type="file"
                accept={acceptedFileFormats.join(',')}
              />
            </RaisedButton>
            <br />
            <br />
            <RaisedButton
              containerElement="label"
              labelColor="white"
              icon={<ActionDone />}
              label="Finish"
              primary
              onClick={() => this.handleFinish()}
            />
          </Fragment>
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
