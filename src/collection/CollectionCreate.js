import React from 'react';
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';

export const CollectionCreate = ({ ...props }) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ArrayInput source="sub_collections">
                <SimpleFormIterator>
                    <TextInput source="name" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);
