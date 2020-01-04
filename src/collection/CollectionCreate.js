import React from 'react';
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, FormDataConsumer } from 'react-admin';

const required = (message = 'Este campo es obligatorio') =>
    value => value ? undefined : message;

export const CollectionCreate = ({ ...props }) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="collections.name" validate={required()} />
            <ArrayInput source="sub_collections" defaultValue={[{name: null}]}>
                <SimpleFormIterator disableRemove={true}>
                    <FormDataConsumer>
                        {({
                            formData,
                            scopedFormData,
                            getSource,
                            ...rest
                        }) =>
                        <TextInput source={getSource('name')} label="collections.name_sub_collection" />
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);
