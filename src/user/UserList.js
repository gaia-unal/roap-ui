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

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="user.name" source="name" />
    <TextInput label="Email" source="email" />
    <TextInput label="user.role" source="role" />
    <TextInput label="fields_name.status" source="status" />
    <DateInput label="fields_name.creation_date" source="created" />
    <DateInput label="fields_name.modified_date" source="modified" />
    <BooleanInput label="fields_name.deleted" source="deleted" />
    <BooleanInput label="fields_name.validated" source="validated" />
    <DateInput label="fields_name.last_activity" source="last_activity" />
  </Filter>
);

export const UserList = ({ permissions, ...props }) => (
  <List title="Users" {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField label="user.name" source="name" />
      <EmailField source="email" />
      <TextField label="user.role" source="role" />
      <TextField label="fields_name.status" source="status" />
      <BooleanField label="fields_name.deleted" source="deleted" />
      <BooleanField label="fields_name.validated" source="validated" />
      <DateField label="fields_name.last_activity" source="last_activity" />
      <EditButton />
    </Datagrid>
  </List>
);
