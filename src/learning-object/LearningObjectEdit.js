import React from 'react';
import {
  LongTextInput,
  TabbedForm,
  FormTab,
  Edit,
  DateInput,
  TextField,
  DateField,
  FunctionField,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  BooleanInput,
  ReferenceInput,
  FormDataConsumer
} from 'react-admin';
import SchemaService from '../custom-services/schema';

import { Field } from 'redux-form';

import ChipInput from 'material-ui-chip-input';

const renderChipList = ({ input, label, meta: { touched, error }, ...custom }) => {
  input.value = input.value instanceof Array ? input.value : [input.value];
  return (
    <React.Fragment>
      <ChipInput
        value={input.value}
        label={label}
        id={label}
        onAdd={chip => {
          return input.onChange([...input.value, chip]);
        }}
        onDelete={(chip, index) => {
          return input.onChange(input.value.filter(v => v !== chip));
        }}
      />
      <br />
    </React.Fragment>
  );
};

export class LearningObjectEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.service = new SchemaService();
    this.state = {
      fetchingSchema: false,
      form: null,
      error: null,
      value: 0,
    };
  }

  generateNestedFormTemp(lom, temp_keys = [], keys = [], form = null) {
    for (var key in lom) {
      if ('fields' in lom[key]) {
        temp_keys.push(key);
        this.generateNestedForm(lom[key].fields, temp_keys, keys);
        temp_keys.splice(-1, 1);
      } else {
        keys.push({
          key: 'metadata.' + temp_keys.join('.') + '.' + key,
          type: lom[key].type,
          required: lom[key].required,
        });
      }
    }
  }

  generateNestedForm(lom, strKeys = []) {
    let formContent = [];
    for (var key in lom) {
      if ('fields' in lom[key]) {
        strKeys.push(key);
        let strKey = 'metadata.' + strKeys.join('.');
        formContent.push(
          <React.Fragment key={strKey}>
            <p>{key}</p>
            <div style={{ marginLeft: 20 }}>{this.generateNestedForm(lom[key].fields, strKeys)}</div>
          </React.Fragment>
        );
        strKeys.splice(-1, 1);
      } else {
        let strKey = 'metadata.' + strKeys.join('.') + '.' + key;
        let choices = null;
        if (lom[key].validate && lom[key].validate.params && lom[key].validate.params.choices) {
          choices = lom[key].validate.params.choices;
        }
        formContent.push(this.getFieldType(lom[key].type, strKey, choices, lom[key].required));
      }
    }
    return <React.Fragment>{formContent}</React.Fragment>;
  }

  getFieldType(type, key, choices, required) {
    let keys = key.split('.');
    let title = keys[keys.length - 1];
    switch (type) {
      case 'string':
        if (choices instanceof Array) {
          return (
            <React.Fragment key={key}>
              <SelectInput
                source={key}
                label={title}
                id={key}
                defaultValue={[{}]}
                choices={choices.map(e => {
                  return { id: e, name: e };
                })}
              />
              <br />
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={key}>
              <LongTextInput
                label={title}
                source={key}
                key={title}
                id={key}
                defaultValue={''}
                style={{ background: required ? '#97CAFF' : 'white' }}
              />
              <br />
            </React.Fragment>
          );
        }
      case 'list':
        return <Field key={key} name={key} component={renderChipList} label={title} id={key} />;
      case 'date':
        return (
          <React.Fragment key={key}>
            <DateInput label={title} source={key} defaultValue={new Date().toISOString().slice(0, 10)} id={key} />
            <br />
          </React.Fragment>
        );
      default:
        return <p>FieldError</p>;
    }
  }

  componentWillMount() {
    this.setState({ fetchingSchema: true }, () => {
      this.service.getSchema(
        schema => {
          let form = this.generateNestedForm(schema.lom, []);
          this.setState({ form });
        },
        error => this.setState({ fetchingSchema: false, error })
      );
    });
  }

  render() {
    return (
      <Edit undoable={false} title="Learning object edition" {...this.props}>
        <TabbedForm>
          <FormTab label="tabs_name.summary">
            {this.props.permissions === 'administrator' ? (
              <ReferenceArrayInput
                label="Expert"
                source="expert_ids"
                reference="user-collection"
                filter={{ role: 'expert' }}
                sort={{ field: 'email', order: 'ASC' }}
                perPage={200}
                allowEmpty
                onChange={evt => this.changeCollection(evt)}
              >
                <SelectArrayInput optionText="email" />
              </ReferenceArrayInput>
            ) : (
                <TextField source="expert_ids" label="Evaluator" />
              )}
            {this.props.permissions === 'administrator' && (
              <SelectInput
                label="fields_name.status"
                source="status"
                choices={[
                  { id: 'pending', name: 'lo.filters.pending' },
                  { id: 'evaluated', name: 'lo.filters.evaluated' },
                  { id: 'accepted', name: 'lo.filters.accepted' },
                  { id: 'rejected', name: 'lo.filters.rejected' },
                ]}
              />
            )}
            <ReferenceInput
              label="Colección"
              source="collection_id"
              reference="collection"
              perPage={200}
              sort={{ field: 'name', order: 'ASC' }}
              allowEmpty
            >
              <SelectInput optionText="name" />
            </ReferenceInput>
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.collection_id && (
                  <ReferenceInput label="Subcolección" source="sub_collection_id" reference='subcollection' filter={{ _id: formData.collection_id }} perPage={200} allowEmpty {...rest}>
                    <SelectInput optionText="name" />
                  </ReferenceInput>)
              }
            </FormDataConsumer>
            <DateField showTime source="created" label="fields_name.creation_date" />
            <DateField showTime source="modified" label="fields_name.modified_date" />
            {this.props.permissions === 'administrator' && <BooleanInput label="fields_name.deleted" source="deleted" />}
            <FunctionField label="fields_name.evaluated" render={record => (record.evaluated ? 'Yes' : 'No')} />
            <TextField source="file_metadata.name" label="fields_name.file_name" />
          </FormTab>
          <FormTab label="metadata">{this.state.form}</FormTab>
        </TabbedForm>
      </Edit>
    );
  }
}
