import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Show, TabbedShowLayout, TextField, DateField, Tab } from 'react-admin';
import ReactJson from 'react-json-view'
 
const LearningObjectFrame = ({ record }) => {
  const backendHost = `${process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'}`;
  const url = `${backendHost}/learning-object-file-renderer/${
    record.file_name && record.file_name.includes('zip') ?
    `${record._id}/index.html` : record.file_name
  }`
  return <iframe
    src={`${url}`}
    style={{ width: '100%', height: '80vh' }}
    title={record.metadata.general.title}
  />;
};

const LearningObjectTitle = ({ record }) => (
  <p>{record.metadata.general.title}</p>
);

const KeyWordsListField = ({ record }) => (
  <div>
    <Typography style={{ marginTop: 9, marginBottom: 9 }} variant="caption">Keywords</Typography>
    {record.metadata.general.keyword.map(keyword =>
      <Chip key={keyword} label={keyword} />
    )}
  </div>
);

const LearningObjectMetadata = ({ record }) => (
  <ReactJson src={record.metadata} />
)

export const LearningObjectShow = (props) => (
  <Show {...props} title={<LearningObjectTitle />} style={{ padding: 0 }}>
    <TabbedShowLayout>
      <Tab label="content">
        <LearningObjectFrame />
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
);