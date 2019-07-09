import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  EditButton,
} from 'react-admin';

const CollectionFilter = props => (
  <Filter {...props}>
    <TextInput label="collections.name" source="name" />
  </Filter>
);

export const CollectionList = ({ permissions, ...props }) => (
  <List title="Colecciones" {...props} filters={<CollectionFilter />}>
    <Datagrid>
      <TextField label="collections.name" source="name" />
      <TextField label="collections.sc_quantity" source="sub_collections.length" />
      <EditButton />
    </Datagrid>
  </List>
);
