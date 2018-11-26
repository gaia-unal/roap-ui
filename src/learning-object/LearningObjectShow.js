import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Show, TabbedShowLayout, TextField, DateField, Tab } from 'react-admin';
import ReactJson from 'react-json-view';
import _ from 'lodash';
import Rating from 'react-rating';
import decodeJwt from 'jwt-decode';
import { connect } from 'react-redux';
import { showNotification } from 'react-admin';

import LearningObjectService from '../custom-services/learningObject';

var learningObjectService =  new LearningObjectService();

const LearningObjectFrame = ({ record }) => {
  const backendHost = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081'}`;
  const url = `${backendHost}/learning-object-file-renderer/${
    record.file_metadata && record.file_metadata.extension === '.zip' ?
    `${record.file_metadata._id}/index.html` : record.file_metadata._id + record.file_metadata.extension
  }`
  return <iframe
    src={`${url}`}
    style={{ width: '100%', height: '80vh' }}
    title={record.metadata.general.title}
  />;
};

const LearningObjectTitle = ({ record }) => (
  <p>
    {
      record.metadata &&
      record.metadata.general &&
      record.metadata.general.title
    }
  </p>
);

const KeyWordsListField = ({ record }) => (
  <div>
    <Typography style={{ marginTop: 9, marginBottom: 9 }} variant="caption">Keywords</Typography>
    {
      record.metadata &&
      record.metadata.general &&
      record.metadata.general.keyword &&
      record.metadata.general.keyword.map(keyword =>
      <Chip key={keyword} label={keyword} />
    )}
  </div>
);

const LearningObjectMetadata = ({ record }) => (
  <ReactJson src={record.metadata} />
)

const RecordRating = ({ record, userRole, userId, showNotification }) => {
  return <React.Fragment>
    <Rating onChange={(rate) => {
      learningObjectService.rateLearningObject(
        record._id,
        userRole,
        rate,
        (r) => showNotification('Learning object rated'),
        (r) => showNotification(r.response.body.message, 'warning'),
      );
      let rating = record.rating;
      let i, j;
      // Find and delete already existent rating for te actual user.
      for(i in rating['expert']){
        for(j = 0; j < rating['expert'][i].length; j++){
          if(userId === rating['expert'][i][j]){
            rating['expert'][i].splice(j, 1);
            break;
          }
        }
      }
      for(i in rating['creator']){
        for(j = 0; j < rating['creator'][i].length; j++){
          if(userId === rating['creator'][i][j]){
            rating['creator'][i].splice(j, 1);
            break;
          }
        }
      }
      rating[userRole][rate] = [...rating[userRole][rate], userId]
    }}
    initialRating={
      (_.sum(_.map(Object.keys(record.rating[userRole]), (k, id) => record.rating[userRole][k].length * (id + 1))) /
      _.sum(_.map(Object.keys(record.rating[userRole]), k => record.rating[userRole][k].length))) || 0
    }
    />
    <br />
  </React.Fragment>;
};

class LearningObjectShow extends React.Component {
  render() {
    let user = decodeJwt(localStorage.getItem('token'));
    return (
      <Show {...this.props} title={<LearningObjectTitle />} style={{ padding: 0 }}>
        <TabbedShowLayout>
          <Tab label="content">
            <LearningObjectFrame />
            <RecordRating userRole={'creator'} userId={user._id} showNotification={this.props.showNotification}/>
            <RecordRating userRole={'expert'} userId={user._id} showNotification={this.props.showNotification}/>
          </Tab>
          <Tab label="summary" path="summary">
            <TextField label="Title" source="metadata.general.title" />
            <TextField label="Description" source="metadata.general.description"/>
            <DateField label="Creation date" source="created" showTime/>
            <KeyWordsListField />
          </Tab>
          <Tab label="metadata" path="metadata">
            <LearningObjectMetadata />
          </Tab>
        </TabbedShowLayout>
      </Show>
    )
  };
};

export default connect(null, {
    showNotification,
})(LearningObjectShow);