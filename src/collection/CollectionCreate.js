import React from 'react';
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, FormDataConsumer } from 'react-admin';

const required = (message = 'Este campo es obligatorio') =>
    value => value ? undefined : message;

export const CollectionCreate = ({ ...props }) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="collections.name" validate={required()} />
            <FormDataConsumer>
                {({ formData, ...rest }) =>
                    <ArrayInput source="sub_collections" label="collections.subcollections" defaultValue={[{ name: null }]}>
                        <SimpleFormIterator disableRemove={ formData.sub_collections && formData.sub_collections.length === 1  }>
                            <TextInput source="name" label="collections.name_sub_collection" validate={required()}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                }
            </FormDataConsumer>
        </SimpleForm>
    </Create>
);
