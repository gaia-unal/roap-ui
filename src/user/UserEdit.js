import React from 'react';
import {
  TextInput,
  BooleanInput,
  DisabledInput,
  SelectInput,
  SimpleForm,
  Edit
} from 'react-admin';

export const UserEdit = (props) => (
    <Edit title="User edition" {...props}>
        <SimpleForm>
            <TextInput label="Name" source="name" />
            <DisabledInput label="E-mail" source="email" />
            <SelectInput label="Role" source="role" choices={[
                { id: 'creator', name: 'Creator' },
                { id: 'expert', name: 'Expert' },
            ]}/>
            <SelectInput label="Status" source="status" choices={[
                { id: 'pending', name: 'Pending' },
                { id: 'accepted', name: 'Accepted' },
                { id: 'rejected', name: 'Rejected' },
            ]}/>
            <DisabledInput label="Create date" source="created" />
            <DisabledInput label="Modifie date" source="modified" />
            <BooleanInput label="Deleted" source="deleted" />
            <DisabledInput label="E-mail validated" source="validated" />
            <DisabledInput label="Last activity" source="last_activity" />
        </SimpleForm>
    </Edit>
);