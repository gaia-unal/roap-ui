import React from 'react';
import {
  LongTextInput,
  DateInput,
  Create,
  SimpleForm,
  ReferenceInput,
  FormDataConsumer,
  FileInput,
  FileField,
  SelectInput,
} from 'react-admin';

import { Field } from 'redux-form';

import ChipInput from 'material-ui-chip-input';

import SchemaService from '../custom-services/schema';

const renderChipList = ({ input, label, meta: { touched, error }, ...custom }) => (
  <React.Fragment>
    <ChipInput
      value={input.value || []}
      label={label}
      onAdd={chip => input.onChange([...(input.value || []), chip])}
      onDelete={(chip, index) => input.onChange(input.value.filter(v => v !== chip))}
    />
    <br />
  </React.Fragment>
);

export class LearningObjectCreate extends React.Component {
  constructor(props) {
    super(props);
    this.service = new SchemaService();
    this.state = {
      fetchingSchema: false,
      form: null,
      error: null,
      value: 0,
    };
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
                choices={choices.map(e => {
                  return { id: e, name: e };
                })}
              />
              <br />
            </React.Fragment>
          );
        } else {
          return (
            <LongTextInput
              label={title}
              source={key}
              key={title}
              defaultValue={''}
              style={{ background: required ? '#3992F0' : 'white' }}
            />
          );
        }
      case 'list':
        return <Field key={key} name={key} component={renderChipList} label={title} />;
      case 'date':
        return (
          <React.Fragment key={key}>
            <DateInput label={title} source={key} defaultValue={new Date().toISOString().slice(0, 10)} />
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
      <Create {...this.props}>
        <SimpleForm>
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
                  <ReferenceInput label="Subcolección" source="sub_collection_id" reference='subcollection' filter={{ collection_id: formData.collection_id }} perPage={200} allowEmpty {...rest}>
                    <SelectInput optionText="name" />
                  </ReferenceInput>)
              }
            </FormDataConsumer>
          <FileInput source="files" label="fields_name.related_files">
            <FileField source="src" title="title" />
          </FileInput>
          {this.state.form}
        </SimpleForm>
      </Create>
    );
  }
}
