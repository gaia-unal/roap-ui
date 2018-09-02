import React from 'react';
import { List, EditButton, ShowButton, TextField, DateField, TextInput, Filter } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import decodeJwt from 'jwt-decode';

const styles = {
  card: {
    width: 400,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
  },
  cardActions: {
    textAlign: 'right'
  }
};

const LearningObjectGird = ({ user, ids, data, basePath }) => (
  <div>
  {ids.map(id =>
    <Card key={id} style={styles.card}>
      <CardContent>
        <Typography noWrap variant="title" gutterBottom>
          <TextField record={data[id]} source="metadata.general.title" />
        </Typography>
        <Typography noWrap variant="caption" gutterBottom>
          <DateField record={data[id]} source="created" showTime/>
        </Typography>
        <Typography noWrap variant="caption" gutterBottom>
          <TextField record={data[id]} source="metadata.general.description" />
        </Typography>
      </CardContent>
      <CardActions style={styles.cardActions}>
        {
          (data[id].creator_id === user._id || user.role === 'administrator') &&
          <EditButton resource="learning-object-collection" basePath={basePath} record={data[id]} />
        }
        <ShowButton resource="learning-object-collection" basePath={basePath} record={data[id]} />
      </CardActions>
    </Card>
  )}
  </div>
);

LearningObjectGird.defaultProps = {
  data: {},
  ids: [],
};

const LearningObjectFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const LearningObjectList = ({permissions, ...props}) => (
  <List title="All Learnning Objects" filters={<LearningObjectFilter />} {...props}>
    <LearningObjectGird user={decodeJwt(localStorage.getItem('token'))}/>
  </List>
);