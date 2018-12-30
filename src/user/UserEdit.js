import React from 'react';
import { TextInput, BooleanInput, DisabledInput, SelectInput, SimpleForm, Edit } from 'react-admin';

export const UserEdit = props => (
  <Edit title="User edition" {...props}>
    <SimpleForm>
      <TextInput label="user.name" source="name" />
      <DisabledInput label="E-mail" source="email" />
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
      <DisabledInput label="fields_name.creation_date" source="created" />
      <DisabledInput label="fields_name.modified_date" source="modified" />
      <BooleanInput label="fields_name.deleted" source="deleted" />
      <DisabledInput label="fields_name.email_validated" source="validated" />
      <DisabledInput label="fields_name.last_activity" source="last_activity" />
    </SimpleForm>
  </Edit>
);
