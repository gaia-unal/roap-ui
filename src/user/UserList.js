import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  EmailField,
  Filter,
  TextInput,
  BooleanInput,
  DateInput,
} from 'react-admin';

const UserFilter = (props) => (
  <Filter {...props}>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="role" />
      <BooleanInput source="aproved_by_admin" />
      <DateInput source="created" />
      <DateInput source="modified" />
      <BooleanInput source="deleted" />
      <BooleanInput source="validated" />
      <DateInput source="last_activity" />
  </Filter>
);

export const UserList = (props) => (
  <List title="Users" {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <BooleanField source="aproved_by_admin" />
      <DateField source="created" />
      <DateField source="modified" />
      <BooleanField source="deleted" />
      <BooleanField source="validated" />
      <DateField source="last_activity" />
    </Datagrid>
  </List>
);