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
  EditButton,
} from 'react-admin';

const UserFilter = (props) => (
  <Filter {...props}>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="role" />
      <TextInput source="status" />
      <DateInput source="created" />
      <DateInput source="modified" />
      <BooleanInput source="deleted" />
      <BooleanInput source="validated" />
      <DateInput source="last_activity" />
  </Filter>
);

export const UserList = ({permissions, ...props}) => (
  <List title="Users" {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="status" />
      <DateField source="created" />
      <DateField source="modified" />
      <BooleanField source="deleted" />
      <BooleanField source="validated" />
      <DateField source="last_activity" />
      <EditButton />
    </Datagrid>
  </List>
);