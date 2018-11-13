import React from 'react';
import {
  List, EditButton, ShowButton, TextInput, Filter, SelectInput
} from 'react-admin';
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

const LearningObjectGird = ({ permissions, user, ids, data, basePath }) => (
  <div>
  {ids.map((id, i) =>
    <Card key={i} style={styles.card}>
      <CardContent>
        <Typography noWrap variant="title" gutterBottom>
          {
            data[id].metadata &&
            data[id].metadata.general &&
            data[id].metadata.general.title
          }
        </Typography>
        <Typography noWrap variant="caption" gutterBottom>
          {
            data[id].created
          }
        </Typography>
        <Typography noWrap variant="subheading" color="textSecondary" gutterBottom>
          {
            data[id].metadata &&
            data[id].metadata.general &&
            data[id].metadata.general.description
          }
        </Typography>
      </CardContent>
      <CardActions style={styles.cardActions}>
        {
          (data[id].creator_id === user._id || user.role === 'administrator') &&
          <EditButton
            resource="learning-object-collection"
            basePath={basePath}
            record={data[id]}
            permissions={permissions}
          />
        }
        <ShowButton
          resource="learning-object-collection"
          basePath={basePath}
          record={data[id]}
        />
      </CardActions>
    </Card>
  )}
  </div>
);

LearningObjectGird.defaultProps = {
  data: {},
  ids: [],
};

const LearningObjectFilter = ({ permissions, user, ...props }) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    {permissions === 'administrator' && <SelectInput
      alwaysOn
      source="advanced_filters"
      optionValue="filter"
      choices={[
        { id: 0, filter: {status: 'pending'}, name: 'Pending' },
        { id: 1, filter: {status: 'evaluated'}, name: 'Evaluated' },
        { id: 2, filter: {status: 'accepted'}, name: 'Accepted' },
        { id: 3, filter: {status: 'rejected'}, name: 'Rejected' },
        { id: 4, filter: {creator_id: user._id}, name: 'Created for me'}
      ]}
    />}
    {permissions === 'expert' && <SelectInput
      alwaysOn
      source="advanced_filters"
      optionValue="filter"
      choices={[
        { id: 0, filter: {}, name: 'All' },
        { id: 1, filter: {expert_ids: user._id}, name: 'Assigned to me' },
        { id: 2, filter: {creator_id: user._id}, name: 'Created for me'}
      ]}
    />}
    {permissions === 'creator' && <SelectInput
      alwaysOn
      source="advanced_filters"
      optionValue="filter"
      choices={[
        { id: 0, filter: {}, name: 'All' },
        { id: 1, filter: {creator_id: user._id}, name: 'Created for me'}
      ]}
    />}
  </Filter>
);

export const LearningObjectList = ({permissions, ...props}) => (
  <List
    {...props}
    title="All Learnning Objects"
    filters={
      <LearningObjectFilter
        permissions={permissions}
        user={decodeJwt(localStorage.getItem('token'))}
      />
    }
  >
    <LearningObjectGird
      user={decodeJwt(localStorage.getItem('token'))}
      permissions={permissions}
    />
  </List>
);