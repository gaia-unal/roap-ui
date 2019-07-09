import React from 'react';
import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, FormDataConsumer } from 'react-admin';

const required = (message = 'Este campo es obligatorio') =>
    value => value ? undefined : message;

export const CollectionEdit = ({ ...props }) => (
    <Edit title="Collection edition" {...props}>
        <SimpleForm>
            <TextInput source="name" label="collections.name" validate={required()} />
            <FormDataConsumer>
                {({ formData, ...rest }) =>
                    <ArrayInput source="sub_collections" label="collections.subcollections" defaultValue={[{ name: null, lo_quantity: 0 }]}>
                        <SimpleFormIterator disableRemove={ (formData.sub_collections && formData.sub_collections.length === 1)}>
                            <TextInput source="name" label="collections.name_sub_collection" validate={required()}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
        </SimpleForm>
    </Edit>
);
