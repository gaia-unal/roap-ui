import React from 'react';
import { List, EditButton, ShowButton, TextInput, Filter, SelectInput, translate, ReferenceInput, FormDataConsumer } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { change } from 'redux-form';

import decodeJwt from 'jwt-decode';
import Notification from '../notification';
const styles = {
  card: {
    width: 400,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  cardActions: {
    textAlign: 'right',
  },
};

const styleDeleted = {
  border: 'solid red',
};

const LearningObjectGird = ({ permissions, user, ids, data, basePath }) => (
  <div>
    <Notification />
    {ids.map((id, i) => (
      <Card key={i} style={data[id].deleted ? { ...styles.card, ...styleDeleted } : styles.card}>
        <CardContent>
          <Typography noWrap variant="title" gutterBottom>
            {data[id].metadata && data[id].metadata.general && data[id].metadata.general.title}
          </Typography>
          <Typography noWrap variant="caption" gutterBottom>
            {data[id].created}
          </Typography>
          <Typography noWrap variant="subheading" color="textSecondary" gutterBottom>
            {data[id].metadata && data[id].metadata.general && data[id].metadata.general.description}
          </Typography>
        </CardContent>
        <CardActions style={styles.cardActions}>
          {(data[id].creator_id === user._id || user.role === 'administrator') && (
            <EditButton
              resource="learning-object-collection"
              basePath={basePath}
              record={data[id]}
              permissions={permissions}
            />
          )}
          <ShowButton resource="learning-object-collection" basePath={basePath} record={data[id]} />
        </CardActions>
      </Card>
    ))}
  </div>
);

LearningObjectGird.defaultProps = {
  data: {},
  ids: [],
};

const LearningObjectFilter = ({ translate, permissions, user, ...props }) => (
  <Filter {...props}>
    <TextInput label={translate('lo.search')} id="inputSearchLo" style={{ width: 225 }} source="q" alwaysOn />
    <FormDataConsumer form={'filterForm'} source='collection_id' alwaysOn>
      {({ formData, dispatch, ...rest }) => (
        <ReferenceInput
          label="Colección"
          resource={props.resource}
          source='collection_id'
          reference='collection'
          onChange={value => {
            dispatch(change('filterForm', 'sub_collection_id', null));
          }}
          allowEmpty>
          <SelectInput optionText='name' />
        </ReferenceInput>
      )}
    </FormDataConsumer>

    {(props.filterValues.collection_id) && (
      <ReferenceInput
        label="Subcolección"
        key={props.filterValues.collection_id}
        source='sub_collection_id'
        reference='subcollection'
        filter={{ _id: props.filterValues.collection_id }}>
        <SelectInput optionText='name' />
      </ReferenceInput>
    )}

    {permissions === 'administrator' && (
      <SelectInput
        alwaysOn
        label={translate('lo.advanced_filters')}
        source="advanced_filters"
        optionValue="filter"
        choices={[
          { id: 0, filter: { status: 'pending' }, name: 'lo.filters.pending' },
          { id: 1, filter: { status: 'evaluated' }, name: 'lo.filters.evaluated' },
          { id: 2, filter: { status: 'accepted' }, name: 'lo.filters.accepted' },
          { id: 3, filter: { status: 'rejected' }, name: 'lo.filters.rejected' },
          { id: 4, filter: { deleted: true }, name: 'lo.filters.deleted' },
          { id: 5, filter: { creator_id: user._id }, name: 'lo.filters.created_for_me' },
        ]}
      />
    )}
    {permissions === 'expert' && (
      <SelectInput
        alwaysOn
        label={translate('lo.advanced_filters')}
        source="advanced_filters"
        optionValue="filter"
        choices={[
          { id: 0, filter: {}, name: 'lo.filters.all' },
          { id: 1, filter: { expert_ids: user._id }, name: 'lo.filters.assigned_to_me' },
          { id: 2, filter: { creator_id: user._id }, name: 'lo.filters.created_for_me' },
        ]}
      />
    )}
    {permissions === 'creator' && (
      <SelectInput
        alwaysOn
        label={translate('lo.advanced_filters')}
        source="advanced_filters"
        optionValue="filter"
        choices={[
          { id: 0, filter: {}, name: 'lo.filters.all' },
          { id: 1, filter: { creator_id: user._id }, name: 'lo.filters.created_for_me' },
        ]}
      />
    )}
  </Filter>
);

const LearningObjectList = ({ translate, permissions, ...props }) => (
  <List
    {...props}
    title={translate('lo.all')}
    filters={
      <LearningObjectFilter
        translate={translate}
        permissions={permissions}
        user={decodeJwt(localStorage.getItem('token'))}
      />
    }
  >
    <LearningObjectGird user={decodeJwt(localStorage.getItem('token'))} permissions={permissions} />
  </List>
);

export default translate(LearningObjectList);
