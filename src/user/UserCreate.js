import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const UserCreate = ({...props}) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" />
        </SimpleForm>
    </Create>
);
