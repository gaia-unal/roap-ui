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
      <TextField label="collections.lo_quantity" source="lo_quantity" />
      <TextField label="collections.sc_quantity" source="sub_collection_ids.length" />
      <EditButton />
    </Datagrid>
  </List>
);
