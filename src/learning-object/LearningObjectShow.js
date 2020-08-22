import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Show, TabbedShowLayout, TextField, DateField, Tab, translate, CardActions, EditButton } from 'react-admin';
import ReactJson from 'react-json-view';
import _ from 'lodash';
import Rating from 'react-rating';
import decodeJwt from 'jwt-decode';
import { connect } from 'react-redux';
import { showNotification } from 'react-admin';
import Button from '@material-ui/core/Button';
import CloudDownload from '@material-ui/icons/CloudDownload';

import LearningObjectService from '../custom-services/learningObject';

var learningObjectService = new LearningObjectService();

const supportedMicrosoftMimetypes = [
  'application/msword',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  'application/vnd.ms-word.document.macroEnabled.12',
  'application/vnd.ms-word.template.macroEnabled.12',
  'application/vnd.ms-excel',
  'application/vnd.ms-excel',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/vnd.ms-excel.template.macroEnabled.12',
  'application/vnd.ms-excel.addin.macroEnabled.12',
  'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  'application/vnd.ms-powerpoint',
  'application/vnd.ms-powerpoint',
  'application/vnd.ms-powerpoint',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.presentationml.template',
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  'application/vnd.ms-powerpoint.addin.macroEnabled.12',
  'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
  'application/vnd.ms-powerpoint.template.macroEnabled.12',
  'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
];

const supportedMediaMimetypes = [
  'video/webm',
  'video/mp4',
  'video/ogg',
  'audio/webm',
  'audio/ogg',
  'audio/mpeg',
  'audio/wave',
  'audio/wav',
  'audio/x-wav',
  'audio/x-pn-wav',
  'audio/flac',
  'audio/x-flac',
  'image/gif',
  'image/png',
  'image/jpeg',
  'image/bmp',
  'image/webp',
  'image/vnd.microsoft.icon',
  'application/zip', //Special mimetype for support html content
  'application/pdf',
  'application/octet-stream',
  'application/x-zip-compressed',
  'multipart/x-zip'
];

const LearningObjectFrame = ({ record }) => {
  const backendHost = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081'}`;
  const url = `${backendHost}/learning-object-file-renderer/${
    record.file_metadata && record.file_metadata.extension === '.zip'
      ? `${record.file_metadata._id}/index.html`
      : record.file_metadata._id + record.file_metadata.extension
  }`;
  const mime_type = record.file_metadata.mime_type;
  if (supportedMediaMimetypes.indexOf(record.file_metadata.mime_type) !== -1) {
    switch (mime_type.split('/')[0]) {
      case 'video':
        return <video controls src={url} style={{ width: '100%', height: '80vh' }} />;
      case 'audio':
        return <audio controls src={url} style={{ width: '100%', height: '80vh' }} />;
      case 'image':
        return <img src={url} style={{ width: '100%', height: '80vh' }} alt={record.metadata.general.title} />;
      default:
        return <iframe src={url} style={{ width: '100%', height: '80vh' }} title={record.metadata.general.title} />;
    }
  } else if (supportedMicrosoftMimetypes.indexOf(mime_type) !== -1) {
    const microsoftApplicationUrl = `https://view.officeapps.live.com/op/view.aspx?src=${url}`;
    return (
      <iframe
        src={microsoftApplicationUrl}
        style={{ width: '100%', height: '80vh' }}
        title={record.metadata.general.title}
      />
    );
  } else {
    return (
      <img
        src={url}
        style={{ width: '100%', height: '80vh' }}
        alt={'Not supported file mime type, please report it to the page Admin'}
      />
    );
  }
};

const LearningObjectTitle = ({ record }) => (
  <p>{record.metadata && record.metadata.general && record.metadata.general.title}</p>
);

const KeyWordsListField = ({ translate, record }) => (
  <div>
    <Typography style={{ marginTop: 9, marginBottom: 9 }} variant="caption">
      {translate('fields_name.keywords')}
    </Typography>
    {record.metadata &&
      record.metadata.general &&
      record.metadata.general.keyword &&
      record.metadata.general.keyword.map(keyword => <Chip key={keyword} label={keyword} />)}
  </div>
);

const LearningObjectMetadata = ({ record }) => <ReactJson src={record.metadata} />;

const RecordRating = ({ record, userRole, userId, showNotification }) => {
  return (
    <React.Fragment>
      <Rating
        onChange={rate => {
          learningObjectService.rateLearningObject(
            record._id,
            userRole,
            rate,
            r => showNotification('Learning object rated'),
            r => showNotification(r.response.body.message, 'warning')
          );
          let rating = record.rating;
          let i, j;
          // Find and delete already existent rating for te actual user.
          for (i in rating['expert']) {
            for (j = 0; j < rating['expert'][i].length; j++) {
              if (userId === rating['expert'][i][j]) {
                rating['expert'][i].splice(j, 1);
                break;
              }
            }
          }
          for (i in rating['creator']) {
            for (j = 0; j < rating['creator'][i].length; j++) {
              if (userId === rating['creator'][i][j]) {
                rating['creator'][i].splice(j, 1);
                break;
              }
            }
          }
          rating[userRole][rate] = [...rating[userRole][rate], userId];
        }}
        initialRating={
          _.sum(_.map(Object.keys(record.rating[userRole]), (k, id) => record.rating[userRole][k].length * (id + 1))) /
            _.sum(_.map(Object.keys(record.rating[userRole]), k => record.rating[userRole][k].length)) || 0
        }
      />
      <br />
    </React.Fragment>
  );
};

const LearningObjectShowActions = ({ basePath, data, resource, userRole, userId }) => (
  <CardActions>
    {(userRole === 'administrator' || userId === (data || {}).creator_id) && (
      <EditButton basePath={basePath} record={data} />
    )}
    {data && data.file_metadata && data.file_metadata.extension === '.zip' && (
      <Button
        style={{ color: '#5300B7' }}
        aria-label="Download learning object"
        onClick={e => {
          e.preventDefault();
          const backendHost = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081'}`;
          const url = `${backendHost}/learning-object-file-renderer/${data &&
            data.file_metadata &&
            data.file_metadata._id + data.file_metadata.extension}`;
          const fakeLink = document.createElement('a');
          document.body.appendChild(fakeLink);
          fakeLink.setAttribute('href', url);
          fakeLink.setAttribute('download', data && data.file_metadata && data.file_metadata.name);
          fakeLink.click();
        }}
      >
        <CloudDownload />
      </Button>
    )}
  </CardActions>
);

class LearningObjectShow extends React.Component {
  render() {
    let user = decodeJwt(localStorage.getItem('token'));
    return (
      <Show
        {...this.props}
        title={<LearningObjectTitle />}
        style={{ padding: 0 }}
        actions={<LearningObjectShowActions userRole={user.role} userId={user._id} />}
      >
        <TabbedShowLayout>
          <Tab label="tabs_name.content">
            <LearningObjectFrame />
            <RecordRating userRole={'creator'} userId={user._id} showNotification={this.props.showNotification} />
            <RecordRating userRole={'expert'} userId={user._id} showNotification={this.props.showNotification} />
          </Tab>
          <Tab label="tabs_name.summary" path="summary">
            <TextField label="fields_name.title" source="metadata.general.title" />
            <TextField label="fields_name.description" source="metadata.general.description" />
            <DateField label="fields_name.creation_date" source="created" showTime />
            <KeyWordsListField translate={this.props.translate} />
          </Tab>
          <Tab label="metadata" path="metadata">
            <LearningObjectMetadata />
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  }
}

export default connect(
  null,
  {
    showNotification,
  }
)(translate(LearningObjectShow));
