import React from 'react';
import { TextInput, BooleanInput, SelectInput, SimpleForm, Edit } from 'react-admin';

export const UserEdit = props => (
  <Edit title="User edition" {...props}>
    <SimpleForm>
      <TextInput label="user.name" source="name" disabled/>
      <TextInput label="E-mail" source="email" />
      <SelectInput
        label="user.role"
        source="role"
        choices={[{ id: 'creator', name: 'user.roles.creator' }, { id: 'expert', name: 'user.roles.expert' }]}
      />
      <SelectInput
        label="Status"
        source="status"
        choices={[
          { id: 'pending', name: 'lo.filters.pending' },
          { id: 'accepted', name: 'lo.filters.accepted' },
          { id: 'rejected', name: 'lo.filters.rejected' },
        ]}
      />
      <TextInput label="fields_name.creation_date" source="created" disabled/>
      <TextInput label="fields_name.modified_date" source="modified" disabled />
      <BooleanInput label="fields_name.deleted" source="deleted" />
      <TextInput label="fields_name.email_validated" source="validated" disabled/>
      <TextInput label="fields_name.last_activity" source="last_activity" disabled/>
    </SimpleForm>
  </Edit>
);
