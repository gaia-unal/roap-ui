import React from 'react';
import {
    TextInput, LongTextInput, TabbedForm, FormTab, Edit, DateInput, DisabledInput, BooleanField,
    ArrayInput, SimpleFormIterator, ReferenceManyField, Datagrid, TextField, DateField, EditButton,
    FunctionField
} from 'react-admin';
import SchemaService from '../custom-services/schema';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


export class LearningObjectEdit extends React.Component {
  constructor(props) {
    super(props);
    this.service = new SchemaService();
    this.state = {
      fetchingSchema: false,
      form: null,
      error: null,
      value: 0,
    }
  }

  generateNestedFormTemp(lom, temp_keys=[], keys=[], form=null) {
    for(var key in lom){
        if ('fields' in lom[key]) {
            temp_keys.push(key);
            this.generateNestedForm(lom[key].fields, temp_keys, keys)
            temp_keys.splice(-1, 1);
        } else {
            keys.push({
                key: 'metadata.' + temp_keys.join('.') + '.' + key,
                type: lom[key].type,
                required: lom[key].required
            })
        }
    }
  }

  generateNestedForm(lom, strKeys=[]) {
    let formContent = [];
    for(var key in lom){
      if ('fields' in lom[key]) {
        strKeys.push(key);
        let strKey = 'metadata.' + strKeys.join('.');
        formContent.push(
          <ArrayInput
            source={strKey}
            key={strKey}
          >
            <SimpleFormIterator>
              {this.generateNestedForm(lom[key].fields, strKeys)}
            </SimpleFormIterator>
          </ArrayInput>
        );
        strKeys.splice(-1, 1);
      } else {
        let strKey = 'metadata.' + strKeys.join('.') + '.' + key;
        formContent.push(this.getFieldType(lom[key].type, strKey));
      }
    }
    return <React.Fragment>{formContent}</React.Fragment>;
  }

  getFieldType(type, key){
    switch(type){
      case 'string': return <LongTextInput source={key} key={key}/>;
      case 'list': return <DateInput source={key} key={key}/>;
      case 'datetime': return <DateInput source={key} key={key}/>;
      default: return <p>Nothing</p>
    }
  }

  componentWillMount() {
    this.setState({fetchingSchema: true}, () => {
      this.service.getSchema(
        schema =>  {
          let form = this.generateNestedForm(schema.lom, []);
          console.log(form);
          this.setState({ form });
        },
        error => this.setState({fetchingSchema: false, error}),
      )
    })
  }

  render() {
    return (
      <Edit {...this.props}>
        <TabbedForm>
          <FormTab label="summary">
            <TextInput source="category" label="Category"/>
            <DateField showTime source="created" label="Created"/>
            <DateField showTime source="modified" label="Modified"/>
            <FunctionField label="Deleted" render={record => record.deleted ? 'Yes' : 'No'} />
            <FunctionField label="Evaluated" render={record => record.evaluated ? 'Yes' : 'No'} />
            <TextField source="file_name" label="File name"/>
            {/*<TextInput source="rating" />*/}
          </FormTab>
          <FormTab label="metadata">
            <Tabs
              value={this.state.value}
              onChange={(_, value) => this.setState({ value })}
              scrollable
              scrollButtons="on"
            >
              <Tab disableRipple label="General" />
              <Tab disableRipple label="Life cycle" />
              <Tab disableRipple label="Metametadata" />
              <Tab disableRipple label="Technical" />
              <Tab disableRipple label="Educational" />
              <Tab disableRipple label="Rigths" />
              <Tab disableRipple label="Relation" />
              <Tab disableRipple label="Annotation" />
              <Tab disableRipple label="Classification" />
            </Tabs>
            {this.state.value === 0 && (
              <React.Fragment>
                <p>Identifier</p>
                  <div style={{marginLeft: 20}}>
                    <LongTextInput source="metadata.general.identifier.catalog" label="Catalog"/>
                    <LongTextInput source="metadata.general.identifier.entry"  label="Entry"/>
                  </div>
                <LongTextInput source="metadata.general.title" label="Title"/>
                <LongTextInput source="metadata.general.language" label="Language"/>
                <LongTextInput source="metadata.general.description" label="Description"/>
                <LongTextInput source="metadata.general.keyword" label="Keyword"/>
                <LongTextInput source="metadata.general.coverage" label="Coverage"/>
                <LongTextInput source="metadata.general.structure" label="Structure"/>
                <LongTextInput source="metadata.general.aggregationlevel" label="Aggregationlevel"/>
              </React.Fragment>
            )}
            {this.state.value === 1 && (
              <React.Fragment>
                <p>Contribute</p>
                  <div style={{marginLeft: 20}}>
                    <LongTextInput source="metadata.lifecycle.contribute.role" label="Role"/>
                    <LongTextInput source="metadata.lifecycle.contribute.date" label="Date"/>
                    <LongTextInput source="metadata.lifecycle.contribute.entity" label="Entity"/>
                  </div>
                <LongTextInput source="metadata.lifecycle.version" label="Version"/>
                <LongTextInput source="metadata.lifecycle.status" label="Status"/>
              </React.Fragment>
            )}
            {this.state.value === 2 && (
              <React.Fragment>
                <p>Identifier</p>
                  <div style={{marginLeft: 20}}>
                    <LongTextInput source="metadata.metametadata.identifier.catalog" label="Catalog"/>
                    <LongTextInput source="metadata.metametadata.identifier.entry" label="Entry"/>
                  </div>
                <p>Contribute</p>
                  <div style={{marginLeft: 20}}>
                    <LongTextInput source="metadata.metametadata.contribute.role" label="Role"/>
                    <LongTextInput source="metadata.metametadata.contribute.date" label="Date"/>
                    <LongTextInput source="metadata.metametadata.contribute.entity" label="Entity"/>
                  </div>
                <LongTextInput source="metadata.metametadata.metadataschema" label="Metadataschema"/>
                <LongTextInput source="metadata.metametadata.language" label="Language"/>
              </React.Fragment>
            )}
            {this.state.value === 3 && (
              <React.Fragment>
                <p>Requirements</p>
                  <div style={{marginLeft: 20}}>
                  <p>Orcomposite</p>
                    <div style={{marginLeft: 20}}>
                      <LongTextInput source="metadata.technical.requirements.orcomposite.type" label="Type"/>
                      <LongTextInput source="metadata.technical.requirements.orcomposite.name" label="Name"/>
                      <LongTextInput source="metadata.technical.requirements.orcomposite.minimumversion" label="Minimumversion"/>
                      <LongTextInput source="metadata.technical.requirements.orcomposite.maximumversion" label="Maximumversion"/>
                    </div>
                  </div>
                <LongTextInput source="metadata.technical.format" label="Format"/>
                <LongTextInput source="metadata.technical.size" label="Size"/>
                <LongTextInput source="metadata.technical.location" label="Location"/>
                <LongTextInput source="metadata.technical.installationremarks" label="Installationremarks"/>
                <LongTextInput source="metadata.technical.otherplatformrequirements" label="Otherplatformrequirements"/>
                <LongTextInput source="metadata.technical.duration" label="Duration"/>
              </React.Fragment>
            )}
            {this.state.value === 4 && (
              <React.Fragment>
                <LongTextInput source="metadata.educational.interactivitytype" label="Interactivitytype"/>
                <LongTextInput source="metadata.educational.learningresourcetype" label="Learningresourcetype"/>
                <LongTextInput source="metadata.educational.interactivitylevel" label="Interactivitylevel"/>
                <LongTextInput source="metadata.educational.semanticdensity" label="Semanticdensity"/>
                <LongTextInput source="metadata.educational.intendedenduserrole" label="Intendedenduserrole"/>
                <LongTextInput source="metadata.educational.context" label="Context"/>
                <LongTextInput source="metadata.educational.typicalagerange" label="Typicalagerange"/>
                <LongTextInput source="metadata.educational.difficulty" label="Difficulty"/>
                <LongTextInput source="metadata.educational.typicallearningtime" label="Typicallearningtime"/>
                <LongTextInput source="metadata.educational.description" label="Description"/>
                <LongTextInput source="metadata.educational.language" label="Language"/>
              </React.Fragment>
            )}
            {this.state.value === 5 && (
              <React.Fragment>
                <LongTextInput source="metadata.rights.cost" label="Cost"/>
                <LongTextInput source="metadata.rights.copyrightandotherrestrictions" label="Copyrightandotherrestrictions"/>
                <LongTextInput source="metadata.rights.description" label="Description"/>
              </React.Fragment>
            )}
            {this.state.value === 6 && (
              <React.Fragment>
                <p>Resouce</p>
                  <div style={{marginLeft: 20}}>
                  <p>Identifier</p>
                    <div style={{marginLeft: 20}}>
                      <LongTextInput source="metadata.relation.resource.identifier.catalog" label="Catalog"/>
                      <LongTextInput source="metadata.relation.resource.identifier.entry" label="Entry"/>
                    </div>
                    <LongTextInput source="metadata.relation.resource.description" label="Description"/>
                  </div>
                <LongTextInput source="metadata.relation.kind" label="Kind"/>
              </React.Fragment>
            )}
            {this.state.value === 7 && (
              <React.Fragment>
                <LongTextInput source="metadata.annotation.entity" label="Entity"/>
                <LongTextInput source="metadata.annotation.date" label="Date"/>
                <LongTextInput source="metadata.annotation.description" label="Description"/>
              </React.Fragment>
            )}
            {this.state.value === 8 && (
              <React.Fragment>
                <p>Taxon path</p>
                  <div style={{marginLeft: 20}}>
                    <LongTextInput source="metadata.classification.taxonPath.source" label="Source"/>
                    <LongTextInput source="metadata.classification.taxonPath.taxon.id" label="Id"/>
                    <LongTextInput source="metadata.classification.taxonPath.taxon.entry" label="Entry"/>
                  </div>
                <LongTextInput source="metadata.classification.purpose" label="Purpose"/>
                <LongTextInput source="metadata.classification.description" label="Description"/>
                <LongTextInput source="metadata.classification.keyword" label="Keyword"/>
              </React.Fragment>
            )}
          </FormTab>
        </TabbedForm>
      </Edit>
    )
  }
}
